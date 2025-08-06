# ShipYo API Integration Guide

This guide explains how **any** client application—web, mobile, desktop, or server-side—can interact with the ShipYo REST API. No assumptions are made about the JavaScript framework (React, Vue, Svelte, Astro, Node) or even the language; only the _concepts_ and _HTTP/JSON_ interactions are covered.

For detailed endpoint specifications, see the [API Reference](/) documentation.

---

## 1. Environment Variables

Define three variables in the environment where your application runs (build-time for static apps, run-time for servers or CLIs):

| Variable | Purpose | Example |
| -------- | ------- | ------- |
| `SHIPYO_ENDPOINT` | Base URL of the ShipYo API | `https://shipyo.it` |
| `SHIPYO_API_KEY` | API key issued by ShipYo | `54e6d32ce...` |
| `SHIPYO_TENANT_ID` | Numeric tenant identifier | `7` |

**Why environment variables?** They let you switch tenants, keys, or staging endpoints without touching code.

> Tip : In browsers built with Vite or Astro, prefix variables that must be exposed to the client with `PUBLIC_` (e.g., `PUBLIC_SHIPYO_TENANT_ID`). In Node back-ends, this is not needed.

---

## 2. Build an HTTP Client Wrapper

Create a small utility that every request in your app goes through.  Pseudocode:

```pseudo
config.endpoint   = ENV["SHIPYO_ENDPOINT"]   or "https://shipyo.it"
config.apiKey     = ENV["SHIPYO_API_KEY"]    // may be undefined in dev
config.tenantId   = ENV["SHIPYO_TENANT_ID"]   // numeric string

client = new HttpClient(baseUrl = config.endpoint)

client.onRequest(request):
  if token = LocalStorage.get("token") or MemoryCache.get("token"):
      request.headers["Authorization"] = "Bearer " + token
  if config.apiKey:
      request.headers["x-api-key"]     = config.apiKey
  if runtimeTenantId = LocalStorage.get("selectedTenantId") or config.tenantId:
      request.headers["X-Tenant-Id"]   = runtimeTenantId
```

Use whatever library you prefer:

### JavaScript example with `fetch`
```js
export async function shipyoFetch(path, options = {}) {
  const endpoint   = process.env.SHIPYO_ENDPOINT  || 'https://shipyo.it';
  const apiKey     = process.env.SHIPYO_API_KEY;
  const tenantId   = localStorage.getItem('selectedTenantId') || process.env.SHIPYO_TENANT_ID;
  const token      = localStorage.getItem('token');

  const headers = {
    ...options.headers,
    ...(apiKey   && { 'x-api-key':   apiKey }),
    ...(tenantId && { 'X-Tenant-Id': tenantId }),
    ...(token    && { 'Authorization': `Bearer ${token}` })
  };

  const resp = await fetch(`${endpoint}${path}`, { ...options, headers });
  if (!resp.ok) throw new Error(`Shipyo request failed: ${resp.status}`);
  return resp.json();
}
```

### JavaScript example with `axios`
```js
import axios from 'axios';

const client = axios.create({ baseURL: process.env.SHIPYO_ENDPOINT || 'https://shipyo.it' });

client.interceptors.request.use(cfg => {
  const apiKey   = process.env.SHIPYO_API_KEY;
  const tenantId = localStorage.getItem('selectedTenantId') || process.env.SHIPYO_TENANT_ID;
  const token    = localStorage.getItem('token');

  if (apiKey)   cfg.headers['x-api-key']   = apiKey;
  if (tenantId) cfg.headers['X-Tenant-Id'] = tenantId;
  if (token)    cfg.headers['Authorization'] = `Bearer ${token}`;
  return cfg;
});

export default client;
```

Implement the same idea in Swift (Alamofire), Kotlin (OkHttp), C# (HttpClient), etc.

---

## 3. Basic Usage Patterns

### 3.1 Read data
```js
const users = await shipyoFetch('/api/User/getAll');
console.log(users);
```

### 3.2 Write data
```js
await shipyoFetch('/api/User/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, tenantId })
});
```

### 3.3 Connection / Health Check
```js
const ok = await shipyoFetch('/health').then(() => true).catch(() => false);
console.log('Shipyo reachable?', ok);
```

---

## 4. Error Handling Recommendations

| Scenario | What to do |
| -------- | ---------- |
| **Network failure** | Retry or prompt user; if running a browser SPA you may want to log out the user to force a clean state. |
| **HTTP 401 (Unauthorized)** | Token expired or invalid. Clear session and redirect to login. |
| **HTTP 403 (Forbidden)** | User lacks permissions. Show a "not authorized" message. |
| **HTTP 4xx/5xx** | Display the `message` property returned by Shipyo API or log it for support. |

---

## 5. Multi-Tenant at Runtime (Optional)

If users can switch tenants while the app is running:

1. Save the new id: `localStorage.setItem('selectedTenantId', newTenantId)`
2. All subsequent requests will automatically carry the tenant through the `X-Tenant-Id` header (see wrapper).

---

## 6. Testing Checklist

- [ ] Environment variables set for **both** build & runtime.
- [ ] HTTP client attaches `x-api-key`, `X-Tenant-Id`, and `Authorization` (when present).
- [ ] `/health` returns HTTP 200 in your logs.
- [ ] Error handler logs/displaying non-200 responses.
- [ ] Static build pipeline (e.g., Docker, CI) injects the same `SHIPYO_*` variables.

---

## 7. Extending the Wrapper (Optional)

Nothing stops you from turning the thin wrapper into a mini-SDK:

```js
export const shipyo = {
  /** GET /api/User/getAll */
  async listUsers() { return shipyoFetch('/api/User/getAll'); },

  /** POST /api/User/login */
  async login(credentials) { return shipyoFetch('/api/User/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
  }); },

  /** POST /api/Token/generate */
  async generateToken(credentials) { return shipyoFetch('/api/Token/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
  }); },

  // ... add more endpoints here ...
};
```

Consumers of your application then call `shipyo.login()` instead of remembering the raw paths.

---

## 8. Common API Endpoints

Here are some frequently used endpoints to get you started:

- **Authentication:** `POST /api/User/login`
- **Generate Token:** `POST /api/Token/generate`
- **Get Users:** `GET /api/User/getAll`
- **Create User:** `POST /api/User/create`
- **Get Tenants:** `GET /api/Tenant/getAll`
- **API Key Management:** `GET /api/ApiKey/getAll`

For complete endpoint documentation, see the [API Reference](/) page.

---

You have now integrated ShipYo in a way that is portable across *any* tech stack. Happy shipping! 🎉