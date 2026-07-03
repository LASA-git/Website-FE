import { apiRequest } from './client';

function normalizeRecentEventsResponse(response) {
  const recentEvents = response?.recentEvents || response || {};

  return {
    carouselItems: Array.isArray(recentEvents.carouselItems) ? recentEvents.carouselItems : [],
    youtubeItems: Array.isArray(recentEvents.youtubeItems) ? recentEvents.youtubeItems : [],
    updatedAt: recentEvents.updatedAt || null,
  };
}

export async function fetchRecentEventsSection() {
  const response = await apiRequest('/api/recent-events');
  return normalizeRecentEventsResponse(response);
}

export async function updateRecentEventsSection(payload, token) {
  const response = await apiRequest('/api/recent-events', {
    method: 'PUT',
    token,
    body: payload,
  });

  return normalizeRecentEventsResponse(response);
}
