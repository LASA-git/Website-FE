import { apiRequest } from './client';

function normalizeGalleryResponse(response) {
  const galleries = response?.galleries || response || {};

  return {
    healthcare: Array.isArray(galleries.healthcare) ? galleries.healthcare : [],
    sociocare: Array.isArray(galleries.sociocare) ? galleries.sociocare : [],
    educare: Array.isArray(galleries.educare) ? galleries.educare : [],
    updatedAt: galleries.updatedAt || null,
  };
}

export async function fetchActivityGalleries() {
  const response = await apiRequest('/api/activity-galleries');
  return normalizeGalleryResponse(response);
}

export async function updateActivityGallery(section, items, token) {
  const response = await apiRequest(`/api/activity-galleries/${section}`, {
    method: 'PUT',
    token,
    body: { items },
  });

  return normalizeGalleryResponse(response);
}
