import { apiRequest } from './client';

function normalizeEventsResponse(response) {
  if (Array.isArray(response)) return response;
  if (response?.events && Array.isArray(response.events)) return response.events;
  return [];
}

function normalizeEventResponse(response) {
  if (!response) return null;
  if (response.event) return response.event;
  return response;
}

export async function fetchCurrentEvents() {
  const response = await apiRequest('/api/events');
  return normalizeEventsResponse(response);
}

export async function fetchArchivedEvents() {
  const response = await apiRequest('/api/events/archived');
  return normalizeEventsResponse(response);
}

export async function fetchActiveEvents() {
  const response = await apiRequest('/api/events/active');
  return normalizeEventsResponse(response);
}

export async function fetchEventById(id, token) {
  const response = await apiRequest(`/api/events/${id}`, { token });
  return normalizeEventResponse(response);
}

export async function createEvent(payload, token) {
  const response = await apiRequest('/api/events', {
    method: 'POST',
    token,
    body: payload,
  });
  return normalizeEventResponse(response);
}

export async function updateEvent(id, payload, token) {
  const response = await apiRequest(`/api/events/${id}`, {
    method: 'PUT',
    token,
    body: payload,
  });
  return normalizeEventResponse(response);
}

export function deleteEvent(id, token) {
  return apiRequest(`/api/events/${id}`, {
    method: 'DELETE',
    token,
  });
}

export function generateFlyer(id, token) {
  return apiRequest(`/api/events/${id}/flyer/generate`, {
    method: 'POST',
    token,
  });
}

export function selectFlyer(id, selectedUrl, token) {
  return apiRequest(`/api/events/${id}/flyer/select`, {
    method: 'POST',
    token,
    body: { selectedUrl },
  });
}
