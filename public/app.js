const state = {
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  name: 'Get Post 1',
  params: [],
  headers: [],
  bodyType: 'none',
  jsonBody: '',
  rawBody: '',
  formData: [],
  urlEncoded: [],
  auth: {
    type: 'none',
    token: '',
    username: '',
    password: '',
    apiKey: '',
    apiVal: '',
    apiTarget: 'header'
  },
  useProxy: true,
  timeout: 300,
  lastResponse: null,
  activeFormat: 'pretty',
  history: []
};

const presets = [
  {
    name: 'Get Post 1 (JSONPlaceholder)',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    headers: [],
    bodyType: 'none',
    jsonBody: ''
  },
  {
    name: 'Get Posts List (Params test)',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: [{ enabled: true, key: '_limit', value: '5', desc: 'Giới hạn 5 bài' }],
    headers: [],
    bodyType: 'none',
    jsonBody: ''
  },
  {
    name: 'Create Post (POST JSON)',
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    headers: [{ enabled: true, key: 'Content-Type', value: 'application/json', desc: '' }],
    bodyType: 'json',
    jsonBody: JSON.stringify({ title: 'Tin mới PutMan', body: 'Nội dung bài viết tạo từ PutMan', userId: 1 }, null, 2)
  },
  {
    name: 'Update Post (PUT)',
    method: 'PUT',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    headers: [{ enabled: true, key: 'Content-Type', value: 'application/json', desc: '' }],
    bodyType: 'json',
    jsonBody: JSON.stringify({ id: 1, title: 'Bài viết đã cập nhật toàn bộ', body: 'Nội dung mới', userId: 1 }, null, 2)
  },
  {
    name: 'Patch Title (PATCH)',
    method: 'PATCH',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    headers: [{ enabled: true, key: 'Content-Type', value: 'application/json', desc: '' }],
    bodyType: 'json',
    jsonBody: JSON.stringify({ title: 'Chỉ sửa tiêu đề' }, null, 2)
  },
  {
    name: 'Delete Post (DELETE)',
    method: 'DELETE',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    headers: [],
    bodyType: 'none',
    jsonBody: ''
  },
  {
    name: 'HTTPBin Echo Headers (GET)',
    method: 'GET',
    url: 'https://httpbin.org/headers',
    headers: [
      { enabled: true, key: 'X-PutMan-Client', value: 'PutMan-Web-1.0', desc: '' },
      { enabled: true, key: 'Accept', value: 'application/json', desc: '' }
    ],
    bodyType: 'none',
    jsonBody: ''
  },
  {
    name: 'HTTPBin Echo Form-urlencoded (POST)',
    method: 'POST',
    url: 'https://httpbin.org/post',
    headers: [],
    bodyType: 'x-www-form-urlencoded',
    urlEncoded: [
      { enabled: true, key: 'username', value: 'alex_putman' },
      { enabled: true, key: 'role', value: 'developer' }
    ]
  }
];

const el = {
  methodSelect: document.getElementById('http-method'),
  urlInput: document.getElementById('request-url'),
  reqTitle: document.getElementById('request-title'),
  btnSend: document.getElementById('btn-send'),
  btnReset: document.getElementById('btn-reset-req'),
  proxyToggle: document.getElementById('toggle-proxy-mode'),
  sidebar: document.getElementById('sidebar'),
  toggleSidebar: document.getElementById('toggle-sidebar'),
  historyContainer: document.getElementById('history-container'),
  presetsContainer: document.getElementById('presets-container'),
  historyList: document.getElementById('history-list'),
  presetsList: document.getElementById('presets-list'),
  historyEmpty: document.getElementById('history-empty'),
  historySearch: document.getElementById('history-search'),
  historyCount: document.getElementById('history-count'),
  btnClearHistory: document.getElementById('btn-clear-history'),
  paramsTable: document.getElementById('params-rows'),
  headersTable: document.getElementById('headers-rows'),
  formdataTable: document.getElementById('formdata-rows'),
  urlencodedTable: document.getElementById('urlencoded-rows'),
  jsonEditor: document.getElementById('json-editor'),
  rawEditor: document.getElementById('raw-editor'),
  btnBeautifyJson: document.getElementById('btn-beautify-json'),
  btnClearJson: document.getElementById('btn-clear-json'),
  btnAddParam: document.getElementById('btn-add-param'),
  btnAddHeader: document.getElementById('btn-add-header'),
  btnAddFormdata: document.getElementById('btn-add-formdata'),
  btnAddUrlencoded: document.getElementById('btn-add-urlencoded'),
  badgeParams: document.getElementById('badge-params'),
  badgeHeaders: document.getElementById('badge-headers'),
  dotBody: document.getElementById('dot-body'),
  dotAuth: document.getElementById('dot-auth'),
  authType: document.getElementById('auth-type'),
  authBearerFields: document.getElementById('auth-bearer-fields'),
  authBasicFields: document.getElementById('auth-basic-fields'),
  authApikeyFields: document.getElementById('auth-apikey-fields'),
  authToken: document.getElementById('auth-token'),
  authUsername: document.getElementById('auth-username'),
  authPassword: document.getElementById('auth-password'),
  authApikeyKey: document.getElementById('auth-apikey-key'),
  authApikeyVal: document.getElementById('auth-apikey-val'),
  authApikeyTarget: document.getElementById('auth-apikey-target'),
  resStatusBadge: document.getElementById('res-status-badge'),
  resTimeVal: document.getElementById('res-time-val'),
  resSizeVal: document.getElementById('res-size-val'),
  resMetrics: document.getElementById('response-metrics'),
  btnCopyRes: document.getElementById('btn-copy-response'),
  btnDownloadRes: document.getElementById('btn-download-response'),
  btnClearRes: document.getElementById('btn-clear-response'),
  badgeResHeaders: document.getElementById('badge-res-headers'),
  resEmptyState: document.getElementById('res-empty-state'),
  resLoadingState: document.getElementById('res-loading-state'),
  resErrorState: document.getElementById('res-error-state'),
  resErrorMessage: document.getElementById('res-error-message'),
  resCodeContainer: document.getElementById('res-code-container'),
  responseCode: document.getElementById('response-code'),
  resHeadersRows: document.getElementById('res-headers-rows'),
  resPreviewFrame: document.getElementById('res-preview-frame'),
  resPreviewImageWrap: document.getElementById('res-preview-image-wrap'),
  resPreviewImage: document.getElementById('res-preview-image'),
  btnImportCurl: document.getElementById('btn-import-curl'),
  btnCopyCurl: document.getElementById('btn-copy-curl'),
  curlModalBackdrop: document.getElementById('curl-modal-backdrop'),
  btnCloseCurlModal: document.getElementById('btn-close-curl-modal'),
  btnCancelCurlModal: document.getElementById('btn-cancel-curl-modal'),
  btnConfirmImportCurl: document.getElementById('btn-confirm-import-curl'),
  curlInputTextarea: document.getElementById('curl-input-textarea'),
  requestTimeout: document.getElementById('request-timeout'),
  toast: document.getElementById('toast')
};

function initApp() {
  loadHistory();
  renderPresets();
  setupEventListeners();
  syncMethodColor();
  parseUrlParams();
  updateBadges();
  renderParams();
  renderHeaders();
  if (el.requestTimeout) {
    el.requestTimeout.value = String(state.timeout);
  }
}

function showToast(message) {
  el.toast.textContent = message;
  el.toast.classList.add('show');
  setTimeout(() => {
    el.toast.classList.remove('show');
  }, 2500);
}

function syncMethodColor() {
  const method = el.methodSelect.value.toLowerCase();
  el.methodSelect.className = `method-select method-${method}`;
  state.method = el.methodSelect.value;
}

function setupEventListeners() {
  el.methodSelect.addEventListener('change', () => {
    syncMethodColor();
    const upper = el.methodSelect.value.toUpperCase();
    if (['POST', 'PUT', 'PATCH'].includes(upper) && state.bodyType === 'none') {
      const radio = document.querySelector('input[name="body-type"][value="json"]');
      if (radio) {
        radio.checked = true;
        setBodyType('json');
      }
    }
  });

  el.urlInput.addEventListener('paste', (e) => {
    const text = (e.clipboardData || window.clipboardData)?.getData('text');
    if (text && isCurlCommand(text)) {
      e.preventDefault();
      applyCurlCommand(text);
    }
  });

  el.urlInput.addEventListener('input', () => {
    const val = el.urlInput.value;
    if (isCurlCommand(val)) {
      applyCurlCommand(val);
      return;
    }
    state.url = val;
    parseUrlParams();
    renderParams();
    updateBadges();
  });

  el.reqTitle.addEventListener('input', () => {
    state.name = el.reqTitle.value || 'Untitled Request';
  });

  if (el.requestTimeout) {
    el.requestTimeout.addEventListener('input', () => {
      const raw = el.requestTimeout.value.trim();
      if (raw !== '') {
        const val = parseFloat(raw);
        if (!Number.isNaN(val) && val >= 0) {
          state.timeout = val;
        }
      }
    });

    const normalizeTimeout = () => {
      const raw = el.requestTimeout.value.trim();
      const val = parseFloat(raw);
      if (raw === '' || Number.isNaN(val) || val < 0) {
        state.timeout = 300;
        el.requestTimeout.value = '300';
      } else {
        state.timeout = val;
        el.requestTimeout.value = String(val);
      }
    };

    el.requestTimeout.addEventListener('change', normalizeTimeout);
    el.requestTimeout.addEventListener('blur', normalizeTimeout);
  }

  el.btnSend.addEventListener('click', executeRequest);

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      executeRequest();
    }
  });

  el.btnReset.addEventListener('click', resetForm);

  el.toggleSidebar.addEventListener('click', () => {
    el.sidebar.classList.toggle('collapsed');
  });

  document.querySelectorAll('.sidebar-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.sidebarTab;
      if (tab === 'history') {
        el.historyContainer.classList.remove('hidden');
        el.presetsContainer.classList.add('hidden');
      } else {
        el.historyContainer.classList.add('hidden');
        el.presetsContainer.classList.remove('hidden');
      }
    });
  });

  el.historySearch.addEventListener('input', (e) => {
    renderHistory(e.target.value.trim());
  });

  el.btnClearHistory.addEventListener('click', () => {
    state.history = [];
    localStorage.removeItem('putman_history');
    renderHistory();
    showToast('Đã xoá lịch sử request');
  });

  el.proxyToggle.addEventListener('change', (e) => {
    state.useProxy = e.target.checked;
    showToast(state.useProxy ? 'Bật chế độ Proxy (bỏ qua CORS)' : 'Bật chế độ Fetch trực tiếp (CORS)');
  });

  document.querySelectorAll('.request-panel .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.request-panel .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.request-panel .tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(btn.dataset.tab);
      if (pane) pane.classList.add('active');
    });
  });

  document.querySelectorAll('.response-panel .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.response-panel .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.response-panel .res-tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(btn.dataset.resTab);
      if (pane) pane.classList.add('active');
    });
  });

  document.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeFormat = btn.dataset.format;
      renderResponseBody();
    });
  });

  document.querySelectorAll('input[name="body-type"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      setBodyType(e.target.value);
    });
  });

  el.btnAddParam.addEventListener('click', () => {
    state.params.push({ enabled: true, key: '', value: '', desc: '' });
    renderParams();
    updateBadges();
  });

  el.btnAddHeader.addEventListener('click', () => {
    state.headers.push({ enabled: true, key: '', value: '', desc: '' });
    renderHeaders();
    updateBadges();
  });

  el.btnAddFormdata.addEventListener('click', () => {
    state.formData.push({ enabled: true, key: '', value: '' });
    renderFormData();
    updateBadges();
  });

  el.btnAddUrlencoded.addEventListener('click', () => {
    state.urlEncoded.push({ enabled: true, key: '', value: '' });
    renderUrlEncoded();
    updateBadges();
  });

  el.btnBeautifyJson.addEventListener('click', () => {
    const raw = el.jsonEditor.value.trim();
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      el.jsonEditor.value = JSON.stringify(parsed, null, 2);
      state.jsonBody = el.jsonEditor.value;
      showToast('Đã định dạng JSON');
    } catch (err) {
      showToast('JSON không hợp lệ: ' + err.message);
    }
  });

  el.btnClearJson.addEventListener('click', () => {
    el.jsonEditor.value = '';
    state.jsonBody = '';
    updateBadges();
  });

  el.jsonEditor.addEventListener('input', () => {
    state.jsonBody = el.jsonEditor.value;
    updateBadges();
  });

  el.rawEditor.addEventListener('input', () => {
    state.rawBody = el.rawEditor.value;
    updateBadges();
  });

  el.authType.addEventListener('change', (e) => {
    state.auth.type = e.target.value;
    el.authBearerFields.classList.toggle('hidden', state.auth.type !== 'bearer');
    el.authBasicFields.classList.toggle('hidden', state.auth.type !== 'basic');
    el.authApikeyFields.classList.toggle('hidden', state.auth.type !== 'apikey');
    updateBadges();
  });

  el.authToken.addEventListener('input', (e) => { state.auth.token = e.target.value; updateBadges(); });
  el.authUsername.addEventListener('input', (e) => { state.auth.username = e.target.value; updateBadges(); });
  el.authPassword.addEventListener('input', (e) => { state.auth.password = e.target.value; updateBadges(); });
  el.authApikeyKey.addEventListener('input', (e) => { state.auth.apiKey = e.target.value; updateBadges(); });
  el.authApikeyVal.addEventListener('input', (e) => { state.auth.apiVal = e.target.value; updateBadges(); });
  el.authApikeyTarget.addEventListener('change', (e) => { state.auth.apiTarget = e.target.value; updateBadges(); });

  el.btnCopyRes.addEventListener('click', () => {
    if (!state.lastResponse || !state.lastResponse.body) {
      showToast('Không có dữ liệu phản hồi để sao chép');
      return;
    }
    navigator.clipboard.writeText(state.lastResponse.body)
      .then(() => showToast('Đã sao chép phản hồi vào clipboard'))
      .catch(() => showToast('Lỗi khi sao chép'));
  });

  el.btnDownloadRes.addEventListener('click', () => {
    if (!state.lastResponse || !state.lastResponse.body) {
      showToast('Không có dữ liệu để tải về');
      return;
    }
    const isJson = (state.lastResponse.contentType || '').includes('json');
    const ext = isJson ? 'json' : 'txt';
    const blob = new Blob([state.lastResponse.body], { type: state.lastResponse.contentType || 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `response_${Date.now()}.${ext}`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast(`Đã tải về response.${ext}`);
  });

  el.btnClearRes.addEventListener('click', clearResponse);

  function openCurlModal() {
    el.curlModalBackdrop.classList.remove('hidden');
    el.curlInputTextarea.value = '';
    el.curlInputTextarea.focus();
  }

  function closeCurlModal() {
    el.curlModalBackdrop.classList.add('hidden');
    el.curlInputTextarea.value = '';
  }

  if (el.btnImportCurl) {
    el.btnImportCurl.addEventListener('click', openCurlModal);
  }
  if (el.btnCloseCurlModal) {
    el.btnCloseCurlModal.addEventListener('click', closeCurlModal);
  }
  if (el.btnCancelCurlModal) {
    el.btnCancelCurlModal.addEventListener('click', closeCurlModal);
  }
  if (el.curlModalBackdrop) {
    el.curlModalBackdrop.addEventListener('click', (e) => {
      if (e.target === el.curlModalBackdrop) {
        closeCurlModal();
      }
    });
  }
  if (el.btnConfirmImportCurl) {
    el.btnConfirmImportCurl.addEventListener('click', () => {
      const text = el.curlInputTextarea.value.trim();
      if (!text) {
        showToast('Vui lòng nhập lệnh cURL');
        return;
      }
      const success = applyCurlCommand(text);
      if (success) {
        closeCurlModal();
      } else {
        showToast('Không thể phân tích cú pháp cURL này');
      }
    });
  }
  if (el.btnCopyCurl) {
    el.btnCopyCurl.addEventListener('click', () => {
      const curlCmd = generateCurlCommand();
      navigator.clipboard.writeText(curlCmd)
        .then(() => showToast('Đã sao chép cURL vào clipboard'))
        .catch(() => showToast('Lỗi khi sao chép'));
    });
  }

  document.addEventListener('paste', (e) => {
    const active = document.activeElement;
    const isEditingText = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');
    if (isEditingText && active !== el.urlInput && active !== el.curlInputTextarea) {
      return;
    }
    if (active === el.urlInput || active === el.curlInputTextarea) {
      return;
    }
    const text = (e.clipboardData || window.clipboardData)?.getData('text');
    if (text && isCurlCommand(text)) {
      e.preventDefault();
      applyCurlCommand(text);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && el.curlModalBackdrop && !el.curlModalBackdrop.classList.contains('hidden')) {
      closeCurlModal();
    }
  });
}

function isCurlCommand(str) {
  if (!str || typeof str !== 'string') return false;
  const s = str.trim();
  if (/^(?:https?:\/\/)?curl\b/i.test(s)) return true;
  if ((s.includes('--header') || s.includes('-H ') || s.includes('--data') || s.includes('-d ')) &&
      (s.includes('http://') || s.includes('https://') || s.includes('--url'))) {
    return true;
  }
  return false;
}

function parseCurlCommand(str) {
  if (!str || typeof str !== 'string') return null;
  const trimmed = str.trim();

  if (!isCurlCommand(trimmed)) {
    return null;
  }

  const cleanStr = trimmed
    .replace(/^\s*https?:\/\/curl\b/i, 'curl')
    .replace(/\\\r?\n/g, ' ')
    .replace(/\^\r?\n/g, ' ')
    .replace(/`\r?\n/g, ' ');

  const tokens = [];
  let curr = '';
  let inSingle = false;
  let inDouble = false;
  let escape = false;

  for (let i = 0; i < cleanStr.length; i++) {
    const c = cleanStr[i];
    if (escape) {
      curr += c;
      escape = false;
    } else if (c === '\\' && !inSingle) {
      escape = true;
    } else if (c === "'" && !inDouble) {
      inSingle = !inSingle;
    } else if (c === '"' && !inSingle) {
      inDouble = !inDouble;
    } else if (/\s/.test(c) && !inSingle && !inDouble) {
      if (curr.length > 0) {
        tokens.push(curr);
        curr = '';
      }
    } else {
      curr += c;
    }
  }
  if (curr.length > 0) tokens.push(curr);

  let method = '';
  let url = '';
  const headers = [];
  const params = [];
  const formData = [];
  const urlEncoded = [];
  const dataParts = [];
  let bodyType = 'none';
  let basicAuth = null;
  let timeout = null;

  const flagsWithValue = new Set([
    '-X', '--request',
    '--url',
    '-H', '--header',
    '-d', '--data', '--data-raw', '--data-binary', '--data-ascii', '--data-urlencode',
    '-F', '--form',
    '-u', '--user',
    '-A', '--user-agent',
    '-b', '--cookie',
    '-c', '--cookie-jar',
    '-e', '--referer',
    '-m', '--max-time',
    '--connect-timeout',
    '-o', '--output',
    '--cacert', '--capath', '--cert', '--key', '--pass',
    '-x', '--proxy', '--proxy-user',
    '--resolve',
    '--retry', '--retry-delay', '--retry-max-time'
  ]);

  let i = 0;
  if (tokens.length > 0 && tokens[0].toLowerCase() === 'curl') {
    i = 1;
  }

  while (i < tokens.length) {
    const token = tokens[i];

    if (token.startsWith('--') && token.includes('=')) {
      const eqIdx = token.indexOf('=');
      const opt = token.substring(0, eqIdx);
      const val = token.substring(eqIdx + 1);

      if (opt === '--request') {
        method = val.toUpperCase().replace(/['"]/g, '');
      } else if (opt === '--url') {
        url = val.replace(/^['"]|['"]$/g, '');
      } else if (opt === '--header') {
        const colonIdx = val.indexOf(':');
        if (colonIdx !== -1) {
          headers.push({
            enabled: true,
            key: val.substring(0, colonIdx).trim(),
            value: val.substring(colonIdx + 1).trim(),
            desc: ''
          });
        }
      } else if (opt === '--user') {
        const colonIdx = val.indexOf(':');
        if (colonIdx !== -1) {
          basicAuth = { username: val.substring(0, colonIdx), password: val.substring(colonIdx + 1) };
        } else {
          basicAuth = { username: val, password: '' };
        }
      } else if (opt === '--form') {
        const eq = val.indexOf('=');
        if (eq !== -1) {
          formData.push({ enabled: true, key: val.substring(0, eq).trim(), value: val.substring(eq + 1).trim() });
        } else {
          formData.push({ enabled: true, key: val.trim(), value: '' });
        }
        bodyType = 'form-data';
      } else if (opt === '--data-urlencode') {
        const eq = val.indexOf('=');
        if (eq !== -1) {
          urlEncoded.push({ enabled: true, key: val.substring(0, eq).trim(), value: val.substring(eq + 1).trim() });
        } else {
          urlEncoded.push({ enabled: true, key: val.trim(), value: '' });
        }
        bodyType = 'x-www-form-urlencoded';
      } else if (['--data', '--data-raw', '--data-binary', '--data-ascii'].includes(opt)) {
        dataParts.push(val);
      } else if (opt === '--max-time') {
        const parsedSec = parseFloat(val);
        if (!Number.isNaN(parsedSec) && parsedSec >= 0) {
          timeout = parsedSec;
        }
      }
      i++;
      continue;
    }

    if (token === '-X' || token === '--request') {
      i++;
      if (i < tokens.length) method = tokens[i].toUpperCase().replace(/['"]/g, '');
    } else if (token.startsWith('-X') && token.length > 2) {
      method = token.substring(2).toUpperCase().replace(/['"]/g, '');
    } else if (token === '--url') {
      i++;
      if (i < tokens.length) url = tokens[i].replace(/^['"]|['"]$/g, '');
    } else if (token === '-H' || token === '--header') {
      i++;
      if (i < tokens.length) {
        const h = tokens[i];
        const colonIdx = h.indexOf(':');
        if (colonIdx !== -1) {
          headers.push({
            enabled: true,
            key: h.substring(0, colonIdx).trim(),
            value: h.substring(colonIdx + 1).trim(),
            desc: ''
          });
        }
      }
    } else if (token.startsWith('-H') && token.length > 2) {
      const h = token.substring(2);
      const colonIdx = h.indexOf(':');
      if (colonIdx !== -1) {
        headers.push({
          enabled: true,
          key: h.substring(0, colonIdx).trim(),
          value: h.substring(colonIdx + 1).trim(),
          desc: ''
        });
      }
    } else if (token === '-u' || token === '--user') {
      i++;
      if (i < tokens.length) {
        const u = tokens[i];
        const colonIdx = u.indexOf(':');
        if (colonIdx !== -1) {
          basicAuth = {
            username: u.substring(0, colonIdx),
            password: u.substring(colonIdx + 1)
          };
        } else {
          basicAuth = { username: u, password: '' };
        }
      }
    } else if (token === '-A' || token === '--user-agent') {
      i++;
      if (i < tokens.length) {
        headers.push({ enabled: true, key: 'User-Agent', value: tokens[i], desc: '' });
      }
    } else if (token === '-b' || token === '--cookie') {
      i++;
      if (i < tokens.length) {
        headers.push({ enabled: true, key: 'Cookie', value: tokens[i], desc: '' });
      }
    } else if (token === '-e' || token === '--referer') {
      i++;
      if (i < tokens.length) {
        headers.push({ enabled: true, key: 'Referer', value: tokens[i], desc: '' });
      }
    } else if (token === '-I' || token === '--head') {
      method = 'HEAD';
    } else if (token === '-F' || token === '--form') {
      i++;
      if (i < tokens.length) {
        const f = tokens[i];
        const eqIdx = f.indexOf('=');
        if (eqIdx !== -1) {
          formData.push({
            enabled: true,
            key: f.substring(0, eqIdx).trim(),
            value: f.substring(eqIdx + 1).trim()
          });
        } else {
          formData.push({ enabled: true, key: f.trim(), value: '' });
        }
        bodyType = 'form-data';
      }
    } else if (token === '--data-urlencode') {
      i++;
      if (i < tokens.length) {
        const d = tokens[i];
        const eqIdx = d.indexOf('=');
        if (eqIdx !== -1) {
          urlEncoded.push({
            enabled: true,
            key: d.substring(0, eqIdx).trim(),
            value: d.substring(eqIdx + 1).trim()
          });
        } else {
          urlEncoded.push({ enabled: true, key: d.trim(), value: '' });
        }
        bodyType = 'x-www-form-urlencoded';
      }
    } else if (
      token === '-d' ||
      token === '--data' ||
      token === '--data-raw' ||
      token === '--data-binary' ||
      token === '--data-ascii'
    ) {
      i++;
      if (i < tokens.length) {
        dataParts.push(tokens[i]);
      }
    } else if (token.startsWith('-d') && token.length > 2) {
      dataParts.push(token.substring(2));
    } else if (token === '-m' || token === '--max-time') {
      i++;
      if (i < tokens.length) {
        const parsedSec = parseFloat(tokens[i]);
        if (!Number.isNaN(parsedSec) && parsedSec >= 0) {
          timeout = parsedSec;
        }
      }
    } else if (flagsWithValue.has(token)) {
      i++;
    } else if (token.startsWith('-')) {
    } else {
      if (!url) {
        url = token.replace(/^['"]|['"]$/g, '');
      } else if (!url.startsWith('http://') && !url.startsWith('https://') &&
                 (token.startsWith('http://') || token.startsWith('https://'))) {
        url = token.replace(/^['"]|['"]$/g, '');
      }
    }

    i++;
  }

  let jsonBody = '';
  let rawBody = '';

  if (bodyType === 'none' && dataParts.length > 0) {
    const rawData = dataParts.join('&');
    const cTypeHeader = headers.find(h => h.key.toLowerCase() === 'content-type');
    const cType = cTypeHeader ? cTypeHeader.value.toLowerCase() : '';

    let isJson = false;
    try {
      const parsed = JSON.parse(rawData);
      jsonBody = JSON.stringify(parsed, null, 2);
      isJson = true;
    } catch {
      isJson = false;
    }

    if (isJson || cType.includes('application/json')) {
      bodyType = 'json';
      jsonBody = jsonBody || rawData;
    } else if (cType.includes('application/x-www-form-urlencoded')) {
      bodyType = 'x-www-form-urlencoded';
      const parts = rawData.split('&');
      parts.forEach(p => {
        const [k, v] = p.split('=');
        if (k) {
          urlEncoded.push({
            enabled: true,
            key: decodeURIComponent(k.replace(/\+/g, ' ')),
            value: v !== undefined ? decodeURIComponent(v.replace(/\+/g, ' ')) : ''
          });
        }
      });
    } else {
      bodyType = 'raw';
      rawBody = rawData;
    }
  }

  if (!method) {
    if (bodyType !== 'none' || dataParts.length > 0 || formData.length > 0 || urlEncoded.length > 0) {
      method = 'POST';
    } else {
      method = 'GET';
    }
  }

  if (url) {
    url = url.replace(/^['"]|['"]$/g, '');
    try {
      const dummyBase = 'https://dummy.local';
      const u = new URL(url.startsWith('http://') || url.startsWith('https://') ? url : `${dummyBase}/${url}`);
      u.searchParams.forEach((val, key) => {
        params.push({ enabled: true, key, value: val, desc: '' });
      });
    } catch {
    }
  }

  return {
    method,
    url,
    headers,
    params,
    bodyType,
    jsonBody,
    rawBody,
    formData,
    urlEncoded,
    basicAuth,
    timeout
  };
}

function applyCurlCommand(rawText) {
  const parsed = parseCurlCommand(rawText);
  if (!parsed) return false;

  state.method = parsed.method || 'GET';
  el.methodSelect.value = state.method;
  syncMethodColor();

  state.url = parsed.url || '';
  el.urlInput.value = parsed.url || '';

  if (parsed.url) {
    try {
      const u = new URL(parsed.url.startsWith('http') ? parsed.url : `https://${parsed.url}`);
      const cleanPath = u.pathname.length > 1 ? u.pathname : u.hostname;
      if (!state.name || state.name === 'Untitled Request' || state.name === 'Get Post 1') {
        state.name = `${state.method} ${cleanPath}`;
        el.reqTitle.value = state.name;
      }
    } catch {
    }
  }

  state.headers = parsed.headers ? JSON.parse(JSON.stringify(parsed.headers)) : [];
  renderHeaders();

  state.params = parsed.params ? JSON.parse(JSON.stringify(parsed.params)) : [];
  renderParams();

  state.formData = parsed.formData ? JSON.parse(JSON.stringify(parsed.formData)) : [];
  renderFormData();

  state.urlEncoded = parsed.urlEncoded ? JSON.parse(JSON.stringify(parsed.urlEncoded)) : [];
  renderUrlEncoded();

  state.bodyType = parsed.bodyType || 'none';
  const radio = document.querySelector(`input[name="body-type"][value="${state.bodyType}"]`);
  if (radio) radio.checked = true;
  setBodyType(state.bodyType);

  if (state.bodyType === 'json') {
    state.jsonBody = parsed.jsonBody || '';
    el.jsonEditor.value = state.jsonBody;
  } else if (state.bodyType === 'raw') {
    state.rawBody = parsed.rawBody || '';
    el.rawEditor.value = state.rawBody;
  } else {
    state.jsonBody = '';
    el.jsonEditor.value = '';
    state.rawBody = '';
    el.rawEditor.value = '';
  }

  if (parsed.basicAuth) {
    state.auth.type = 'basic';
    state.auth.username = parsed.basicAuth.username || '';
    state.auth.password = parsed.basicAuth.password || '';
    el.authType.value = 'basic';
    el.authUsername.value = state.auth.username;
    el.authPassword.value = state.auth.password;
    el.authBasicFields.classList.remove('hidden');
    el.authBearerFields.classList.add('hidden');
    el.authApikeyFields.classList.add('hidden');
  }

  state.timeout = parsed.timeout !== null && parsed.timeout !== undefined ? parsed.timeout : 300;
  if (el.requestTimeout) {
    el.requestTimeout.value = String(state.timeout);
  }

  updateBadges();

  if (state.bodyType !== 'none') {
    const tabBtn = document.querySelector('.request-panel .tab-btn[data-tab="tab-body"]');
    if (tabBtn) tabBtn.click();
  } else if (state.params.length > 0) {
    const tabBtn = document.querySelector('.request-panel .tab-btn[data-tab="tab-params"]');
    if (tabBtn) tabBtn.click();
  } else if (state.headers.length > 0) {
    const tabBtn = document.querySelector('.request-panel .tab-btn[data-tab="tab-headers"]');
    if (tabBtn) tabBtn.click();
  }

  showToast('Đã import cURL thành công');
  return true;
}

function generateCurlCommand() {
  const reqData = prepareRequestPayload();
  const parts = ['curl'];

  if (reqData.method !== 'GET') {
    parts.push(`-X ${reqData.method}`);
  }

  parts.push(`'${reqData.url || 'https://'}'`);

  for (const [key, val] of Object.entries(reqData.headers)) {
    parts.push(`-H '${key}: ${String(val).replace(/'/g, "'\\''")}'`);
  }

  if (reqData.body && !['GET', 'HEAD'].includes(reqData.method)) {
    parts.push(`-d '${String(reqData.body).replace(/'/g, "'\\''")}'`);
  }

  if (state.timeout !== 300 && state.timeout > 0) {
    parts.push(`--max-time ${state.timeout}`);
  }

  return parts.join(' \\\n  ');
}

function setBodyType(type) {
  state.bodyType = type;
  document.getElementById('body-none-wrap').classList.toggle('hidden', type !== 'none');
  document.getElementById('body-json-wrap').classList.toggle('hidden', type !== 'json');
  document.getElementById('body-raw-wrap').classList.toggle('hidden', type !== 'raw');
  document.getElementById('body-formdata-wrap').classList.toggle('hidden', type !== 'form-data');
  document.getElementById('body-urlencoded-wrap').classList.toggle('hidden', type !== 'x-www-form-urlencoded');

  if (type === 'form-data' && state.formData.length === 0) {
    state.formData.push({ enabled: true, key: '', value: '' });
    renderFormData();
  }
  if (type === 'x-www-form-urlencoded' && state.urlEncoded.length === 0) {
    state.urlEncoded.push({ enabled: true, key: '', value: '' });
    renderUrlEncoded();
  }

  updateBadges();
}

function parseUrlParams() {
  try {
    const rawUrl = el.urlInput.value.trim();
    if (!rawUrl) return;
    const dummyBase = 'https://dummy.local';
    const parsed = new URL(rawUrl.startsWith('http://') || rawUrl.startsWith('https://') ? rawUrl : `${dummyBase}/${rawUrl}`);
    const entries = [];
    parsed.searchParams.forEach((value, key) => {
      entries.push({ enabled: true, key, value, desc: '' });
    });
    if (entries.length > 0 || state.params.length > 0) {
      state.params = entries;
    }
  } catch {
  }
}

function rebuildUrlFromParams() {
  const rawUrl = el.urlInput.value.trim();
  if (!rawUrl) return;

  const qIndex = rawUrl.indexOf('?');
  const baseUrl = qIndex !== -1 ? rawUrl.substring(0, qIndex) : rawUrl;

  const validParams = state.params.filter(p => p.enabled && p.key.trim() !== '');
  if (validParams.length === 0) {
    el.urlInput.value = baseUrl;
    state.url = baseUrl;
    return;
  }

  const queryStrings = validParams.map(p => `${encodeURIComponent(p.key.trim())}=${encodeURIComponent(p.value.trim())}`);
  const finalUrl = `${baseUrl}?${queryStrings.join('&')}`;
  el.urlInput.value = finalUrl;
  state.url = finalUrl;
}

function renderParams() {
  el.paramsTable.innerHTML = '';
  state.params.forEach((param, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="kv-check-wrap">
          <input type="checkbox" ${param.enabled ? 'checked' : ''} data-index="${index}" class="param-enable">
        </div>
      </td>
      <td>
        <input type="text" class="kv-input param-key" placeholder="Key" value="${escapeHtml(param.key)}" data-index="${index}">
      </td>
      <td>
        <input type="text" class="kv-input param-val" placeholder="Value" value="${escapeHtml(param.value)}" data-index="${index}">
      </td>
      <td>
        <input type="text" class="kv-input param-desc" placeholder="Mô tả" value="${escapeHtml(param.desc || '')}" data-index="${index}">
      </td>
      <td>
        <button type="button" class="kv-row-del" data-index="${index}" title="Xoá hàng">✕</button>
      </td>
    `;
    el.paramsTable.appendChild(row);
  });

  el.paramsTable.querySelectorAll('.param-enable').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.params[idx].enabled = e.target.checked;
      rebuildUrlFromParams();
      updateBadges();
    });
  });

  el.paramsTable.querySelectorAll('.param-key').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.params[idx].key = e.target.value;
      rebuildUrlFromParams();
      updateBadges();
    });
  });

  el.paramsTable.querySelectorAll('.param-val').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.params[idx].value = e.target.value;
      rebuildUrlFromParams();
    });
  });

  el.paramsTable.querySelectorAll('.param-desc').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.params[idx].desc = e.target.value;
    });
  });

  el.paramsTable.querySelectorAll('.kv-row-del').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.params.splice(idx, 1);
      renderParams();
      rebuildUrlFromParams();
      updateBadges();
    });
  });
}

function renderHeaders() {
  el.headersTable.innerHTML = '';
  state.headers.forEach((header, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="kv-check-wrap">
          <input type="checkbox" ${header.enabled ? 'checked' : ''} data-index="${index}" class="header-enable">
        </div>
      </td>
      <td>
        <input type="text" class="kv-input header-key" placeholder="Key" value="${escapeHtml(header.key)}" data-index="${index}">
      </td>
      <td>
        <input type="text" class="kv-input header-val" placeholder="Value" value="${escapeHtml(header.value)}" data-index="${index}">
      </td>
      <td>
        <input type="text" class="kv-input header-desc" placeholder="Mô tả" value="${escapeHtml(header.desc || '')}" data-index="${index}">
      </td>
      <td>
        <button type="button" class="kv-row-del" data-index="${index}" title="Xoá hàng">✕</button>
      </td>
    `;
    el.headersTable.appendChild(row);
  });

  el.headersTable.querySelectorAll('.header-enable').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.headers[idx].enabled = e.target.checked;
      updateBadges();
    });
  });

  el.headersTable.querySelectorAll('.header-key').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.headers[idx].key = e.target.value;
      updateBadges();
    });
  });

  el.headersTable.querySelectorAll('.header-val').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.headers[idx].value = e.target.value;
    });
  });

  el.headersTable.querySelectorAll('.header-desc').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.headers[idx].desc = e.target.value;
    });
  });

  el.headersTable.querySelectorAll('.kv-row-del').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.headers.splice(idx, 1);
      renderHeaders();
      updateBadges();
    });
  });
}

function renderFormData() {
  el.formdataTable.innerHTML = '';
  state.formData.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="kv-check-wrap">
          <input type="checkbox" ${item.enabled ? 'checked' : ''} data-index="${index}" class="fd-enable">
        </div>
      </td>
      <td>
        <input type="text" class="kv-input fd-key" placeholder="Key" value="${escapeHtml(item.key)}" data-index="${index}">
      </td>
      <td>
        <input type="text" class="kv-input fd-val" placeholder="Value" value="${escapeHtml(item.value)}" data-index="${index}">
      </td>
      <td>
        <button type="button" class="kv-row-del" data-index="${index}" title="Xoá hàng">✕</button>
      </td>
    `;
    el.formdataTable.appendChild(row);
  });

  el.formdataTable.querySelectorAll('.fd-enable').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.formData[idx].enabled = e.target.checked;
      updateBadges();
    });
  });

  el.formdataTable.querySelectorAll('.fd-key').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.formData[idx].key = e.target.value;
      updateBadges();
    });
  });

  el.formdataTable.querySelectorAll('.fd-val').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.formData[idx].value = e.target.value;
    });
  });

  el.formdataTable.querySelectorAll('.kv-row-del').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.formData.splice(idx, 1);
      renderFormData();
      updateBadges();
    });
  });
}

function renderUrlEncoded() {
  el.urlencodedTable.innerHTML = '';
  state.urlEncoded.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="kv-check-wrap">
          <input type="checkbox" ${item.enabled ? 'checked' : ''} data-index="${index}" class="ue-enable">
        </div>
      </td>
      <td>
        <input type="text" class="kv-input ue-key" placeholder="Key" value="${escapeHtml(item.key)}" data-index="${index}">
      </td>
      <td>
        <input type="text" class="kv-input ue-val" placeholder="Value" value="${escapeHtml(item.value)}" data-index="${index}">
      </td>
      <td>
        <button type="button" class="kv-row-del" data-index="${index}" title="Xoá hàng">✕</button>
      </td>
    `;
    el.urlencodedTable.appendChild(row);
  });

  el.urlencodedTable.querySelectorAll('.ue-enable').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.urlEncoded[idx].enabled = e.target.checked;
      updateBadges();
    });
  });

  el.urlencodedTable.querySelectorAll('.ue-key').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.urlEncoded[idx].key = e.target.value;
      updateBadges();
    });
  });

  el.urlencodedTable.querySelectorAll('.ue-val').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.urlEncoded[idx].value = e.target.value;
    });
  });

  el.urlencodedTable.querySelectorAll('.kv-row-del').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.urlEncoded.splice(idx, 1);
      renderUrlEncoded();
      updateBadges();
    });
  });
}

function updateBadges() {
  const activeParams = state.params.filter(p => p.enabled && p.key.trim() !== '').length;
  el.badgeParams.textContent = activeParams;

  const activeHeaders = state.headers.filter(h => h.enabled && h.key.trim() !== '').length;
  el.badgeHeaders.textContent = activeHeaders;

  let hasBody = false;
  if (state.bodyType === 'json' && state.jsonBody.trim() !== '') hasBody = true;
  if (state.bodyType === 'raw' && state.rawBody.trim() !== '') hasBody = true;
  if (state.bodyType === 'form-data' && state.formData.some(f => f.enabled && f.key.trim())) hasBody = true;
  if (state.bodyType === 'x-www-form-urlencoded' && state.urlEncoded.some(u => u.enabled && u.key.trim())) hasBody = true;
  el.dotBody.classList.toggle('hidden', !hasBody);

  let hasAuth = false;
  if (state.auth.type === 'bearer' && state.auth.token.trim()) hasAuth = true;
  if (state.auth.type === 'basic' && (state.auth.username.trim() || state.auth.password.trim())) hasAuth = true;
  if (state.auth.type === 'apikey' && state.auth.apiKey.trim() && state.auth.apiVal.trim()) hasAuth = true;
  el.dotAuth.classList.toggle('hidden', !hasAuth);
}

function prepareRequestPayload() {
  let targetUrl = el.urlInput.value.trim();
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = `https://${targetUrl}`;
    el.urlInput.value = targetUrl;
  }

  const headerObj = {};
  state.headers.forEach(h => {
    if (h.enabled && h.key.trim()) {
      headerObj[h.key.trim()] = h.value;
    }
  });

  if (state.auth.type === 'bearer' && state.auth.token.trim()) {
    headerObj['Authorization'] = `Bearer ${state.auth.token.trim()}`;
  } else if (state.auth.type === 'basic' && (state.auth.username || state.auth.password)) {
    const token = btoa(`${state.auth.username}:${state.auth.password}`);
    headerObj['Authorization'] = `Basic ${token}`;
  } else if (state.auth.type === 'apikey' && state.auth.apiKey.trim() && state.auth.apiVal.trim()) {
    if (state.auth.apiTarget === 'header') {
      headerObj[state.auth.apiKey.trim()] = state.auth.apiVal.trim();
    } else {
      const sep = targetUrl.includes('?') ? '&' : '?';
      targetUrl = `${targetUrl}${sep}${encodeURIComponent(state.auth.apiKey.trim())}=${encodeURIComponent(state.auth.apiVal.trim())}`;
    }
  }

  let finalBody = null;
  const method = el.methodSelect.value.toUpperCase();
  const allowBody = !['GET', 'HEAD'].includes(method);

  if (allowBody) {
    if (state.bodyType === 'json') {
      finalBody = state.jsonBody;
      if (!headerObj['Content-Type']) {
        headerObj['Content-Type'] = 'application/json';
      }
    } else if (state.bodyType === 'raw') {
      finalBody = state.rawBody;
      if (!headerObj['Content-Type']) {
        headerObj['Content-Type'] = 'text/plain';
      }
    } else if (state.bodyType === 'x-www-form-urlencoded') {
      const params = new URLSearchParams();
      state.urlEncoded.forEach(u => {
        if (u.enabled && u.key.trim()) {
          params.append(u.key.trim(), u.value);
        }
      });
      finalBody = params.toString();
      if (!headerObj['Content-Type']) {
        headerObj['Content-Type'] = 'application/x-www-form-urlencoded';
      }
    } else if (state.bodyType === 'form-data') {
      const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
      let bodyStr = '';
      state.formData.forEach(item => {
        if (item.enabled && item.key.trim()) {
          bodyStr += `--${boundary}\r\n`;
          bodyStr += `Content-Disposition: form-data; name="${item.key.trim()}"\r\n\r\n`;
          bodyStr += `${item.value}\r\n`;
        }
      });
      if (bodyStr) {
        bodyStr += `--${boundary}--\r\n`;
        finalBody = bodyStr;
        headerObj['Content-Type'] = `multipart/form-data; boundary=${boundary}`;
      }
    }
  }

  const rawTimeout = el.requestTimeout ? parseFloat(el.requestTimeout.value.trim()) : state.timeout;
  const timeoutSec = !Number.isNaN(rawTimeout) && rawTimeout >= 0 ? rawTimeout : 300;
  state.timeout = timeoutSec;

  return {
    url: targetUrl,
    method,
    headers: headerObj,
    body: finalBody,
    timeoutMs: Math.round(timeoutSec * 1000)
  };
}

async function executeRequest() {
  const reqData = prepareRequestPayload();
  if (!reqData.url) {
    showToast('Vui lòng nhập URL');
    return;
  }

  setLoadingState(true);

  const startTime = performance.now();
  let result = null;

  try {
    if (state.useProxy) {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
      });
      result = await response.json();
    } else {
      const fetchOpts = {
        method: reqData.method,
        headers: reqData.headers
      };
      if (reqData.body && !['GET', 'HEAD'].includes(reqData.method)) {
        fetchOpts.body = reqData.body;
      }

      const controller = new AbortController();
      let timedOut = false;
      const timeoutId = reqData.timeoutMs > 0
        ? setTimeout(() => {
            timedOut = true;
            controller.abort();
          }, reqData.timeoutMs)
        : null;
      fetchOpts.signal = controller.signal;

      let directRes;
      let bodyText;
      try {
        directRes = await fetch(reqData.url, fetchOpts);
        bodyText = await directRes.text();
      } catch (directErr) {
        if (timedOut || directErr.name === 'AbortError') {
          const timeoutErr = new Error(`Request timed out (${Math.round(reqData.timeoutMs / 100) / 10}s limit)`);
          timeoutErr.name = 'TimeoutError';
          throw timeoutErr;
        }
        throw directErr;
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }

      const duration = Math.round(performance.now() - startTime);

      const resHeaders = {};
      directRes.headers.forEach((v, k) => {
        resHeaders[k] = v;
      });

      result = {
        status: directRes.status,
        statusText: directRes.statusText,
        headers: resHeaders,
        time: duration,
        size: new Blob([bodyText]).size,
        contentType: directRes.headers.get('content-type') || '',
        body: bodyText,
        isBase64: false
      };
    }

    state.lastResponse = result;
    renderResponse(result);
    addToHistory(reqData, result);
  } catch (err) {
    const duration = Math.round(performance.now() - startTime);
    const errResult = {
      error: true,
      status: 0,
      statusText: err.name === 'TimeoutError' ? 'Timeout' : 'Client Error',
      message: err.message || 'Không thể kết nối đến máy chủ',
      time: duration,
      size: 0,
      headers: {},
      body: ''
    };
    state.lastResponse = errResult;
    renderResponse(errResult);
    addToHistory(reqData, errResult);
  } finally {
    setLoadingState(false);
  }
}

function setLoadingState(isLoading) {
  el.btnSend.disabled = isLoading;
  const btnText = el.btnSend.querySelector('.btn-send-text');
  const spinner = el.btnSend.querySelector('.btn-send-spinner');
  
  if (isLoading) {
    btnText.classList.add('hidden');
    spinner.classList.remove('hidden');
    el.resEmptyState.classList.add('hidden');
    el.resErrorState.classList.add('hidden');
    el.resCodeContainer.classList.add('hidden');
    el.resLoadingState.classList.remove('hidden');
  } else {
    btnText.classList.remove('hidden');
    spinner.classList.add('hidden');
    el.resLoadingState.classList.add('hidden');
  }
}

function renderResponse(res) {
  el.resMetrics.classList.remove('hidden');

  const status = res.status;
  const statusText = res.statusText ? ` ${res.statusText}` : '';
  el.resStatusBadge.textContent = `${status || 'ERR'}${statusText}`;

  el.resStatusBadge.className = 'status-code-badge';
  if (status >= 200 && status < 300) {
    el.resStatusBadge.classList.add('s-2xx');
  } else if (status >= 300 && status < 400) {
    el.resStatusBadge.classList.add('s-3xx');
  } else if (status >= 400 && status < 500) {
    el.resStatusBadge.classList.add('s-4xx');
  } else if (status >= 500) {
    el.resStatusBadge.classList.add('s-5xx');
  } else {
    el.resStatusBadge.classList.add('s-0');
  }

  el.resTimeVal.textContent = res.time < 1000 ? `${res.time} ms` : `${(res.time / 1000).toFixed(2)} s`;
  el.resSizeVal.textContent = formatBytes(res.size || 0);

  if (res.error) {
    el.resCodeContainer.classList.add('hidden');
    el.resEmptyState.classList.add('hidden');
    el.resErrorState.classList.remove('hidden');
    el.resErrorMessage.textContent = res.message;
    return;
  }

  el.resErrorState.classList.add('hidden');
  el.resEmptyState.classList.add('hidden');
  el.resCodeContainer.classList.remove('hidden');

  renderResponseBody();
  renderResponseHeaders(res.headers || {});
  renderResponsePreview(res);
}

function renderResponseBody() {
  if (!state.lastResponse) return;
  const { body, contentType, isBase64 } = state.lastResponse;

  if (!body) {
    el.responseCode.textContent = '(Empty response body)';
    return;
  }

  if (isBase64) {
    el.responseCode.textContent = `[Binary content encoded in Base64 - Length: ${body.length}]\n\n${body.substring(0, 500)}...`;
    return;
  }

  const isJson = (contentType || '').includes('json');

  if (state.activeFormat === 'pretty') {
    if (isJson) {
      try {
        const parsed = JSON.parse(body);
        el.responseCode.innerHTML = syntaxHighlightJson(JSON.stringify(parsed, null, 2));
      } catch {
        el.responseCode.textContent = body;
      }
    } else {
      el.responseCode.textContent = body;
    }
  } else {
    el.responseCode.textContent = body;
  }
}

function renderResponseHeaders(headers) {
  el.resHeadersRows.innerHTML = '';
  const entries = Object.entries(headers);
  el.badgeResHeaders.textContent = entries.length;

  if (entries.length === 0) {
    el.resHeadersRows.innerHTML = '<tr><td colspan="2" style="text-align:center;color:var(--text-muted);padding:14px;">Không có Header nào được trả về</td></tr>';
    return;
  }

  entries.sort(([a], [b]) => a.localeCompare(b)).forEach(([key, val]) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-family:var(--font-mono);font-weight:600;color:var(--text-primary);">${escapeHtml(key)}</td>
      <td style="font-family:var(--font-mono);word-break:break-all;">${escapeHtml(String(val))}</td>
    `;
    el.resHeadersRows.appendChild(row);
  });
}

function renderResponsePreview(res) {
  const cType = (res.contentType || '').toLowerCase();
  
  if (cType.includes('image/') && res.body) {
    el.resPreviewFrame.classList.add('hidden');
    el.resPreviewImageWrap.classList.remove('hidden');
    const prefix = res.isBase64 ? `data:${cType};base64,` : `data:${cType};utf-8,`;
    el.resPreviewImage.src = prefix + res.body;
  } else if (cType.includes('text/html') || cType.includes('text/plain') || cType.includes('application/xml')) {
    el.resPreviewImageWrap.classList.add('hidden');
    el.resPreviewFrame.classList.remove('hidden');
    el.resPreviewFrame.srcdoc = res.body;
  } else {
    el.resPreviewImageWrap.classList.add('hidden');
    el.resPreviewFrame.classList.remove('hidden');
    el.resPreviewFrame.srcdoc = `<div style="font-family:sans-serif;color:#666;padding:20px;text-align:center;">Preview không hỗ trợ content-type: ${escapeHtml(cType || 'unknown')}</div>`;
  }
}

function clearResponse() {
  state.lastResponse = null;
  el.resMetrics.classList.add('hidden');
  el.resCodeContainer.classList.add('hidden');
  el.resErrorState.classList.add('hidden');
  el.resLoadingState.classList.add('hidden');
  el.resEmptyState.classList.remove('hidden');
  el.responseCode.textContent = '';
  el.resHeadersRows.innerHTML = '';
  el.badgeResHeaders.textContent = '0';
  el.resPreviewFrame.srcdoc = '';
  el.resPreviewImage.src = '';
  showToast('Đã xoá kết quả phản hồi');
}

function syntaxHighlightJson(jsonString) {
  const escaped = escapeHtml(jsonString);
  return escaped.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'json-number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'json-key';
      } else {
        cls = 'json-string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'json-boolean';
    } else if (/null/.test(match)) {
      cls = 'json-null';
    }
    return `<span class="${cls}">${match}</span>`;
  });
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function addToHistory(req, res) {
  const item = {
    id: Date.now().toString(),
    time: Date.now(),
    title: state.name || 'Untitled',
    method: req.method,
    url: req.url,
    status: res.status || 0,
    statusText: res.statusText || '',
    duration: res.time || 0,
    stateSnapshot: {
      method: req.method,
      url: req.url,
      name: state.name,
      params: JSON.parse(JSON.stringify(state.params)),
      headers: JSON.parse(JSON.stringify(state.headers)),
      bodyType: state.bodyType,
      jsonBody: state.jsonBody,
      rawBody: state.rawBody,
      formData: JSON.parse(JSON.stringify(state.formData)),
      urlEncoded: JSON.parse(JSON.stringify(state.urlEncoded)),
      auth: JSON.parse(JSON.stringify(state.auth)),
      timeout: state.timeout
    }
  };

  state.history.unshift(item);
  if (state.history.length > 50) {
    state.history = state.history.slice(0, 50);
  }

  saveHistory();
  renderHistory();
}

function saveHistory() {
  try {
    localStorage.setItem('putman_history', JSON.stringify(state.history));
  } catch {
  }
}

function loadHistory() {
  try {
    const raw = localStorage.getItem('putman_history');
    if (raw) {
      state.history = JSON.parse(raw);
    }
  } catch {
    state.history = [];
  }
  renderHistory();
}

function renderHistory(query = '') {
  el.historyList.innerHTML = '';
  const filtered = state.history.filter(item => {
    if (!query) return true;
    const q = query.toLowerCase();
    return item.url.toLowerCase().includes(q) ||
      item.method.toLowerCase().includes(q) ||
      (item.title && item.title.toLowerCase().includes(q));
  });

  el.historyCount.textContent = state.history.length;
  el.historyEmpty.classList.toggle('hidden', filtered.length > 0);

  filtered.forEach(item => {
    const li = document.createElement('li');
    li.className = 'history-item';

    let statusCls = 'history-status-0';
    if (item.status >= 200 && item.status < 300) statusCls = 'history-status-2xx';
    else if (item.status >= 300 && item.status < 400) statusCls = 'history-status-3xx';
    else if (item.status >= 400 && item.status < 500) statusCls = 'history-status-4xx';
    else if (item.status >= 500) statusCls = 'history-status-5xx';

    const urlDisplay = item.url.replace(/^https?:\/\//, '');

    li.innerHTML = `
      <div class="history-item-left">
        <span class="method-badge ${item.method}">${item.method}</span>
        <span class="history-item-url" title="${escapeHtml(item.url)}">${escapeHtml(urlDisplay)}</span>
      </div>
      <div class="history-item-meta">
        <span class="history-status ${statusCls}">${item.status || 'ERR'}</span>
        <button type="button" class="history-del-btn" data-id="${item.id}" title="Xoá mục này">✕</button>
      </div>
    `;

    li.addEventListener('click', (e) => {
      if (e.target.classList.contains('history-del-btn')) return;
      loadSnapshot(item.stateSnapshot);
    });

    const delBtn = li.querySelector('.history-del-btn');
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.history = state.history.filter(h => h.id !== item.id);
      saveHistory();
      renderHistory(el.historySearch.value.trim());
    });

    el.historyList.appendChild(li);
  });
}

function renderPresets() {
  el.presetsList.innerHTML = '';
  presets.forEach(preset => {
    const li = document.createElement('li');
    li.className = 'preset-item';
    li.innerHTML = `
      <div class="history-item-left">
        <span class="method-badge ${preset.method}">${preset.method}</span>
        <span class="history-item-desc" title="${escapeHtml(preset.name)}">${escapeHtml(preset.name)}</span>
      </div>
    `;
    li.addEventListener('click', () => {
      applyPreset(preset);
    });
    el.presetsList.appendChild(li);
  });
}

function applyPreset(preset) {
  el.methodSelect.value = preset.method;
  syncMethodColor();
  el.urlInput.value = preset.url;
  state.url = preset.url;
  el.reqTitle.value = preset.name;
  state.name = preset.name;

  state.params = preset.params ? JSON.parse(JSON.stringify(preset.params)) : [];
  parseUrlParams();
  renderParams();

  state.headers = preset.headers ? JSON.parse(JSON.stringify(preset.headers)) : [];
  renderHeaders();

  state.urlEncoded = preset.urlEncoded ? JSON.parse(JSON.stringify(preset.urlEncoded)) : [];
  renderUrlEncoded();

  state.formData = preset.formData ? JSON.parse(JSON.stringify(preset.formData)) : [];
  renderFormData();

  state.bodyType = preset.bodyType || 'none';
  const radio = document.querySelector(`input[name="body-type"][value="${state.bodyType}"]`);
  if (radio) radio.checked = true;
  setBodyType(state.bodyType);

  if (preset.jsonBody) {
    el.jsonEditor.value = preset.jsonBody;
    state.jsonBody = preset.jsonBody;
  } else {
    el.jsonEditor.value = '';
    state.jsonBody = '';
  }

  state.timeout = preset.timeout !== undefined ? preset.timeout : 300;
  if (el.requestTimeout) {
    el.requestTimeout.value = String(state.timeout);
  }

  updateBadges();
  showToast(`Đã áp dụng mẫu: ${preset.name}`);
}

function loadSnapshot(snap) {
  if (!snap) return;
  el.methodSelect.value = snap.method;
  syncMethodColor();

  el.urlInput.value = snap.url;
  state.url = snap.url;

  el.reqTitle.value = snap.name || 'Untitled Request';
  state.name = el.reqTitle.value;

  state.params = snap.params ? JSON.parse(JSON.stringify(snap.params)) : [];
  renderParams();

  state.headers = snap.headers ? JSON.parse(JSON.stringify(snap.headers)) : [];
  renderHeaders();

  state.formData = snap.formData ? JSON.parse(JSON.stringify(snap.formData)) : [];
  renderFormData();

  state.urlEncoded = snap.urlEncoded ? JSON.parse(JSON.stringify(snap.urlEncoded)) : [];
  renderUrlEncoded();

  state.bodyType = snap.bodyType || 'none';
  const radio = document.querySelector(`input[name="body-type"][value="${state.bodyType}"]`);
  if (radio) radio.checked = true;
  setBodyType(state.bodyType);

  el.jsonEditor.value = snap.jsonBody || '';
  state.jsonBody = el.jsonEditor.value;

  el.rawEditor.value = snap.rawBody || '';
  state.rawBody = el.rawEditor.value;

  if (snap.auth) {
    state.auth = JSON.parse(JSON.stringify(snap.auth));
    el.authType.value = state.auth.type;
    el.authToken.value = state.auth.token || '';
    el.authUsername.value = state.auth.username || '';
    el.authPassword.value = state.auth.password || '';
    el.authApikeyKey.value = state.auth.apiKey || '';
    el.authApikeyVal.value = state.auth.apiVal || '';
    el.authApikeyTarget.value = state.auth.apiTarget || 'header';

    el.authBearerFields.classList.toggle('hidden', state.auth.type !== 'bearer');
    el.authBasicFields.classList.toggle('hidden', state.auth.type !== 'basic');
    el.authApikeyFields.classList.toggle('hidden', state.auth.type !== 'apikey');
  }

  state.timeout = snap.timeout !== undefined ? snap.timeout : 300;
  if (el.requestTimeout) {
    el.requestTimeout.value = String(state.timeout);
  }

  updateBadges();
  showToast('Đã tải lại request từ lịch sử');
}

function resetForm() {
  el.methodSelect.value = 'GET';
  syncMethodColor();
  el.urlInput.value = '';
  state.url = '';
  el.reqTitle.value = 'Untitled Request';
  state.name = 'Untitled Request';

  state.params = [];
  renderParams();

  state.headers = [];
  renderHeaders();

  state.formData = [];
  renderFormData();

  state.urlEncoded = [];
  renderUrlEncoded();

  state.bodyType = 'none';
  const radio = document.querySelector('input[name="body-type"][value="none"]');
  if (radio) radio.checked = true;
  setBodyType('none');

  el.jsonEditor.value = '';
  state.jsonBody = '';
  el.rawEditor.value = '';
  state.rawBody = '';

  state.auth = {
    type: 'none',
    token: '',
    username: '',
    password: '',
    apiKey: '',
    apiVal: '',
    apiTarget: 'header'
  };
  el.authType.value = 'none';
  el.authToken.value = '';
  el.authUsername.value = '';
  el.authPassword.value = '';
  el.authApikeyKey.value = '';
  el.authApikeyVal.value = '';
  el.authBearerFields.classList.add('hidden');
  el.authBasicFields.classList.add('hidden');
  el.authApikeyFields.classList.add('hidden');

  state.timeout = 300;
  if (el.requestTimeout) {
    el.requestTimeout.value = '300';
  }

  clearResponse();
  updateBadges();
  showToast('Đã làm mới form');
}

window.addEventListener('DOMContentLoaded', initApp);
