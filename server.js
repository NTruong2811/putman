import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DEFAULT_TIMEOUT_MS = 300000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(join(__dirname, 'public')));

function decompressBody(buffer, contentEncoding) {
  if (!buffer || buffer.length === 0 || !contentEncoding) {
    return buffer;
  }
  const enc = contentEncoding.toLowerCase().trim();
  try {
    if (enc.includes('gzip')) {
      return zlib.gunzipSync(buffer);
    }
    if (enc.includes('br')) {
      return zlib.brotliDecompressSync(buffer);
    }
    if (enc.includes('deflate')) {
      try {
        return zlib.inflateSync(buffer);
      } catch {
        return zlib.inflateRawSync(buffer);
      }
    }
  } catch {
    return buffer;
  }
  return buffer;
}

function stripHeaders(headersObj, keysToRemove) {
  const result = {};
  for (const [k, v] of Object.entries(headersObj)) {
    if (!keysToRemove.includes(k.toLowerCase())) {
      result[k] = v;
    }
  }
  return result;
}

function proxyHttpRequest(targetUrl, options, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (options.signal?.aborted) {
      const abortErr = new Error('The operation was aborted');
      abortErr.name = 'AbortError';
      return reject(abortErr);
    }

    const parsed = new URL(targetUrl);
    const transport = parsed.protocol === 'https:' ? https : http;
    const method = (options.method || 'GET').toUpperCase();
    const reqHeaders = { ...options.headers };

    const hasAcceptEncoding = Object.keys(reqHeaders).some(k => k.toLowerCase() === 'accept-encoding');
    if (!hasAcceptEncoding) {
      reqHeaders['Accept-Encoding'] = 'gzip, deflate, br';
    }

    let payloadBuffer = null;
    if (!['GET', 'HEAD'].includes(method) && options.body !== null && options.body !== undefined && options.body !== '') {
      const rawBody = typeof options.body === 'object' ? JSON.stringify(options.body) : String(options.body);
      payloadBuffer = Buffer.from(rawBody, 'utf-8');
      const hasContentLength = Object.keys(reqHeaders).some(k => k.toLowerCase() === 'content-length');
      if (!hasContentLength) {
        reqHeaders['Content-Length'] = String(payloadBuffer.byteLength);
      }
    }

    let settled = false;
    const finishReject = (err) => {
      if (settled) return;
      settled = true;
      reject(err);
    };
    const finishResolve = (val) => {
      if (settled) return;
      settled = true;
      resolve(val);
    };

    const req = transport.request(parsed, {
      method,
      headers: reqHeaders,
      signal: options.signal
    }, (upstreamRes) => {
      const statusCode = upstreamRes.statusCode || 0;
      const responseHeaders = {};
      for (const [key, value] of Object.entries(upstreamRes.headers)) {
        if (value !== undefined) {
          responseHeaders[key] = Array.isArray(value) ? value.join(', ') : String(value);
        }
      }

      if ([301, 302, 303, 307, 308].includes(statusCode) && upstreamRes.headers.location) {
        if (redirectCount >= 20) {
          upstreamRes.resume();
          return finishReject(new Error('Too many redirects'));
        }
        upstreamRes.resume();
        const nextUrl = new URL(upstreamRes.headers.location, targetUrl).toString();
        const nextParsed = new URL(nextUrl);
        let nextMethod = method;
        let nextBody = options.body;
        let nextHeaders = { ...options.headers };

        if (statusCode === 303 || ((statusCode === 301 || statusCode === 302) && method === 'POST')) {
          nextMethod = 'GET';
          nextBody = null;
          nextHeaders = stripHeaders(nextHeaders, ['content-type', 'content-length']);
        }
        if (nextParsed.origin !== parsed.origin) {
          nextHeaders = stripHeaders(nextHeaders, ['authorization', 'cookie']);
        }

        proxyHttpRequest(nextUrl, {
          method: nextMethod,
          headers: nextHeaders,
          body: nextBody,
          signal: options.signal
        }, redirectCount + 1).then(finishResolve, finishReject);
        return;
      }

      const chunks = [];
      upstreamRes.on('data', (chunk) => chunks.push(chunk));
      upstreamRes.on('error', finishReject);
      upstreamRes.on('end', () => {
        const rawBuffer = Buffer.concat(chunks);
        const bodyBuffer = decompressBody(rawBuffer, responseHeaders['content-encoding']);
        finishResolve({
          status: statusCode,
          statusText: upstreamRes.statusMessage || '',
          headers: responseHeaders,
          buffer: bodyBuffer
        });
      });
    });

    req.setTimeout(0);
    req.on('error', finishReject);

    if (payloadBuffer) {
      req.end(payloadBuffer);
    } else {
      req.end();
    }
  });
}

app.post('/api/proxy', async (req, res) => {
  req.setTimeout(0);
  res.setTimeout(0);

  const startTime = performance.now();
  const { url, method = 'GET', headers = {}, body = null } = req.body;

  if (!url) {
    return res.status(400).json({ error: true, message: 'URL is required' });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`);
  } catch {
    return res.status(400).json({ error: true, message: 'Invalid URL format' });
  }

  let timeoutMs = DEFAULT_TIMEOUT_MS;
  if (req.body.timeoutMs !== undefined && req.body.timeoutMs !== null && req.body.timeoutMs !== '') {
    const parsedTimeout = Number(req.body.timeoutMs);
    if (Number.isFinite(parsedTimeout) && parsedTimeout >= 0) {
      timeoutMs = parsedTimeout;
    }
  }

  const controller = new AbortController();
  let timedOut = false;
  const timeoutId = timeoutMs > 0
    ? setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, timeoutMs)
    : null;

  const onClientClose = () => {
    if (!res.writableEnded) {
      controller.abort();
    }
  };
  res.on('close', onClientClose);

  try {
    const cleanHeaders = {};
    const disallowedHeaders = ['host', 'content-length', 'connection'];

    if (headers && typeof headers === 'object') {
      for (const [key, val] of Object.entries(headers)) {
        if (!key || val === undefined || val === null) continue;
        if (!disallowedHeaders.includes(key.toLowerCase())) {
          cleanHeaders[key] = String(val);
        }
      }
    }

    const upstream = await proxyHttpRequest(parsedUrl.toString(), {
      method,
      headers: cleanHeaders,
      body,
      signal: controller.signal
    });

    const duration = Math.round(performance.now() - startTime);
    const contentType = upstream.headers['content-type'] || '';
    const lowerContentType = contentType.toLowerCase();
    const buffer = upstream.buffer;
    const size = buffer.byteLength;

    let bodyData;
    let isBase64 = false;

    const isTextual = lowerContentType.includes('application/json') ||
      lowerContentType.includes('text/') ||
      lowerContentType.includes('application/xml') ||
      lowerContentType.includes('application/javascript') ||
      lowerContentType.includes('application/x-www-form-urlencoded') ||
      lowerContentType.includes('image/svg+xml') ||
      !lowerContentType;

    if (isTextual || size === 0) {
      bodyData = buffer.toString('utf-8');
    } else {
      bodyData = buffer.toString('base64');
      isBase64 = true;
    }

    return res.json({
      status: upstream.status,
      statusText: upstream.statusText,
      headers: upstream.headers,
      time: duration,
      size,
      contentType,
      body: bodyData,
      isBase64
    });
  } catch (error) {
    const duration = Math.round(performance.now() - startTime);
    const isTimeout = timedOut || error.name === 'AbortError';
    const timeoutSec = Math.round(timeoutMs / 100) / 10;

    return res.status(200).json({
      error: true,
      message: isTimeout ? `Request timed out (${timeoutSec}s limit)` : (error.message || 'Network request failed'),
      time: duration,
      status: 0,
      statusText: isTimeout ? 'Timeout' : 'Network Error',
      headers: {},
      size: 0,
      body: ''
    });
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
    res.off('close', onClientClose);
  }
});

const server = app.listen(PORT, () => {
  process.stdout.write(`PutMan server running at http://localhost:${PORT}\n`);
});
server.requestTimeout = 0;
