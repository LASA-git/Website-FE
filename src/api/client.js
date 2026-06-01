const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

function getBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || '';
}

async function handleResponse(response) {
  if (response.ok) {
    if (response.status === 204) return null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  }

  let errorMessage = 'Request failed';
  try {
    const errorData = await response.json();
    if (errorData?.message) errorMessage = errorData.message;
  } catch {
    const text = await response.text();
    if (text) errorMessage = text;
  }

  const error = new Error(errorMessage);
  error.status = response.status;
  throw error;
}

export async function apiRequest(path, { method = 'GET', token, body, headers } = {}) {
  const url = `${getBaseUrl()}${path}`;
  const mergedHeaders = {
    ...DEFAULT_HEADERS,
    ...headers,
  };

  if (token) {
    mergedHeaders.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers: mergedHeaders,
  };

  if (body !== undefined && body !== null) {
    options.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const response = await fetch(url, options);
  return handleResponse(response);
}

export async function apiUpload(uploadUrl, file) {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return true;
}
