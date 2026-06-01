import { apiRequest } from './client';

export function loginAdmin({ email, password }) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export function registerAdmin({ name, email, password }) {
  return apiRequest('/api/auth/register', {
    method: 'POST',
    body: { name, email, password },
  });
}

export function fetchAdminProfile(token) {
  return apiRequest('/api/auth/me', { token });
}
