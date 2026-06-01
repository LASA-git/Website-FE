import { apiRequest } from './client';

export async function createVolunteer(payload) {
  return apiRequest('/api/volunteers', {
    method: 'POST',
    body: payload,
  });
}
