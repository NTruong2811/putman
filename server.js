import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(join(__dirname, 'public')));

app.post('/api/proxy', async (req, res) => {
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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);

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

    const fetchOptions = {
      method: method.toUpperCase(),
      headers: cleanHeaders,
      signal: controller.signal,
      redirect: 'follow'
    };

    const upperMethod = method.toUpperCase();
    if (!['GET', 'HEAD'].includes(upperMethod) && body !== null && body !== undefined && body !== '') {
      fetchOptions.body = typeof body === 'object' ? JSON.stringify(body) : String(body);
    }

    const response = await fetch(parsedUrl.toString(), fetchOptions);
    const duration = Math.round(performance.now() - startTime);
    clearTimeout(timeoutId);

    const responseHeaders = {};
    response.headers.forEach((value, name) => {
      responseHeaders[name] = value;
    });

    const contentType = response.headers.get('content-type') || '';
    const arrayBuffer = await response.arrayBuffer();
    const size = arrayBuffer.byteLength;
    const buffer = Buffer.from(arrayBuffer);

    let bodyData;
    let isBase64 = false;

    const isTextual = contentType.includes('application/json') ||
      contentType.includes('text/') ||
      contentType.includes('application/xml') ||
      contentType.includes('application/javascript') ||
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('image/svg+xml');

    if (isTextual || size === 0) {
      bodyData = buffer.toString('utf-8');
    } else {
      bodyData = buffer.toString('base64');
      isBase64 = true;
    }

    return res.json({
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      time: duration,
      size,
      contentType,
      body: bodyData,
      isBase64
    });
  } catch (error) {
    clearTimeout(timeoutId);
    const duration = Math.round(performance.now() - startTime);
    const isTimeout = error.name === 'AbortError';

    return res.status(200).json({
      error: true,
      message: isTimeout ? 'Request timed out (45s limit)' : (error.message || 'Network request failed'),
      time: duration,
      status: 0,
      statusText: isTimeout ? 'Timeout' : 'Network Error',
      headers: {},
      size: 0,
      body: ''
    });
  }
});

app.listen(PORT, () => {
  process.stdout.write(`PutMan server running at http://localhost:${PORT}\n`);
});
