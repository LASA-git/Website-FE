import { apiRequest, apiUpload } from './client';

export async function uploadMedia({ file, folder }, token) {
  const presign = await apiRequest('/api/media/presign', {
    method: 'POST',
    token,
    body: {
      folder,
      fileName: file.name,
      contentType: file.type || 'application/octet-stream',
    },
  });

  await apiUpload(presign.uploadUrl, file);
  return presign.publicUrl;
}
