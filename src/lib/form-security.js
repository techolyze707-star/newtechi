const RATE_LIMIT_STORE = globalThis.__vuRateLimitStore || new Map();
if (!globalThis.__vuRateLimitStore) {
  globalThis.__vuRateLimitStore = RATE_LIMIT_STORE;
}

function firstHeaderValue(value) {
  if (!value) return '';
  return value.split(',')[0].trim();
}

function normalizeHost(host) {
  return host?.trim().toLowerCase() || '';
}

function getAllowedOrigins() {
  const raw = process.env.ALLOWED_FORM_ORIGINS || '';
  return raw
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
}

export function getClientIp(headerStore) {
  const forwardedFor = firstHeaderValue(headerStore.get('x-forwarded-for'));
  if (forwardedFor) return forwardedFor;
  return (headerStore.get('x-real-ip') || 'unknown').trim();
}

export function validateSameOrigin(headerStore) {
  const origin = headerStore.get('origin');
  const referer = headerStore.get('referer');

  let originHost = '';
  if (origin) {
    try {
      originHost = normalizeHost(new URL(origin).host);
    } catch {
      return { ok: false, reason: 'Invalid origin header' };
    }
  } else if (referer) {
    try {
      originHost = normalizeHost(new URL(referer).host);
    } catch {
      return { ok: false, reason: 'Invalid referer header' };
    }
  } else {
    return { ok: false, reason: 'Missing origin and referer headers' };
  }

  const requestHost = normalizeHost(
    firstHeaderValue(headerStore.get('x-forwarded-host')) || headerStore.get('host')
  );

  if (!requestHost) {
    return { ok: false, reason: 'Missing host header' };
  }

  if (originHost === requestHost) {
    return { ok: true };
  }

  const allowList = getAllowedOrigins();
  if (origin && allowList.includes(origin)) {
    return { ok: true };
  }

  return { ok: false, reason: 'Cross-origin request blocked' };
}

export function validateJsonContentType(headerStore) {
  const contentType = (headerStore.get('content-type') || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    return { ok: false, reason: 'Unsupported content type' };
  }

  return { ok: true };
}

export function checkRateLimit({ key, windowMs, limit }) {
  const now = Date.now();
  const record = RATE_LIMIT_STORE.get(key);

  if (!record || now - record.windowStart >= windowMs) {
    RATE_LIMIT_STORE.set(key, { windowStart: now, count: 1 });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (record.count >= limit) {
    const retryAfterSeconds = Math.ceil((windowMs - (now - record.windowStart)) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  record.count += 1;
  RATE_LIMIT_STORE.set(key, record);

  return {
    allowed: true,
    remaining: Math.max(0, limit - record.count),
    retryAfterSeconds: 0,
  };
}
