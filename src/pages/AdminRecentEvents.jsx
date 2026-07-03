import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRecentEventsSection, updateRecentEventsSection } from '../api/recentEvents';
import { uploadMedia } from '../api/media';
import { useAuth } from '../auth/AuthProvider';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';

function withOrder(items) {
  return (items || []).map((item, index) => ({ ...item, order: index }));
}

function extractYouTubeVideoId(input) {
  if (!input || typeof input !== 'string') return null;

  const value = input.trim();
  if (!value) return null;

  const idPattern = /^[A-Za-z0-9_-]{11}$/;
  if (idPattern.test(value)) return value;

  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    if (host === 'youtu.be') {
      const pathId = url.pathname.replace(/^\//, '').split('/')[0];
      return idPattern.test(pathId) ? pathId : null;
    }

    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      const fromQuery = url.searchParams.get('v');
      if (fromQuery && idPattern.test(fromQuery)) return fromQuery;

      const segments = url.pathname.split('/').filter(Boolean);
      if (['embed', 'shorts', 'live'].includes(segments[0]) && idPattern.test(segments[1] || '')) {
        return segments[1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

function moveItem(items, fromIndex, toIndex) {
  if (toIndex < 0 || toIndex >= items.length) {
    return items;
  }

  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return withOrder(next);
}

function getEmbedUrl(item) {
  const videoId = item.videoId || extractYouTubeVideoId(item.youtubeUrl);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
}

export default function AdminRecentEvents() {
  const { token } = useAuth();
  const [content, setContent] = useState({
    carouselItems: [],
    youtubeItems: [],
    updatedAt: null,
  });
  const [youtubeForm, setYoutubeForm] = useState({ youtubeUrl: '', title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const loadSection = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecentEventsSection();
      setContent({
        carouselItems: withOrder(data.carouselItems),
        youtubeItems: withOrder(data.youtubeItems),
        updatedAt: data.updatedAt,
      });
    } catch (err) {
      setError(err?.message || 'Unable to load recent events section');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSection();
  }, [loadSection]);

  const handleUploadCarousel = async (files) => {
    if (!files.length) return;

    setUploading(true);
    setError(null);

    try {
      const uploadedItems = [];
      for (const file of files) {
        const imageUrl = await uploadMedia({ file, folder: 'recent-events/carousel' }, token);
        uploadedItems.push({
          imageUrl,
          altText: file.name,
        });
      }

      setContent((prev) => ({
        ...prev,
        carouselItems: withOrder([...(prev.carouselItems || []), ...uploadedItems]),
      }));
    } catch (err) {
      setError(err?.message || 'Unable to upload carousel image');
    } finally {
      setUploading(false);
    }
  };

  const addYoutubeItem = () => {
    const hasYoutubeUrl = Boolean(youtubeForm.youtubeUrl.trim());
    const hasTitle = Boolean(youtubeForm.title.trim());
    const hasDescription = Boolean(youtubeForm.description.trim());

    if (!hasYoutubeUrl && !hasTitle && !hasDescription) {
      setError('Please add at least one of link, title, or description.');
      return;
    }

    setError(null);

    setContent((prev) => ({
      ...prev,
      youtubeItems: withOrder([
        ...(prev.youtubeItems || []),
        {
          youtubeUrl: youtubeForm.youtubeUrl.trim(),
          title: youtubeForm.title.trim(),
          description: youtubeForm.description.trim(),
        },
      ]),
    }));

    setYoutubeForm({ youtubeUrl: '', title: '', description: '' });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        carouselItems: withOrder(
          content.carouselItems.map((item) => ({
            imageUrl: item.imageUrl,
            altText: item.altText || '',
            order: item.order,
          }))
        ),
        youtubeItems: withOrder(
          content.youtubeItems.map((item) => ({
            videoId: item.videoId,
            youtubeUrl: item.youtubeUrl,
            title: item.title || '',
            description: item.description || '',
            order: item.order,
          }))
        ),
      };

      const saved = await updateRecentEventsSection(payload, token);
      setContent({
        carouselItems: withOrder(saved.carouselItems),
        youtubeItems: withOrder(saved.youtubeItems),
        updatedAt: saved.updatedAt,
      });
    } catch (err) {
      setError(err?.message || 'Unable to save recent events section');
    } finally {
      setSaving(false);
    }
  };

  const updatedAtLabel = useMemo(() => {
    if (!content.updatedAt) return 'Not saved yet';
    return new Date(content.updatedAt).toLocaleString();
  }, [content.updatedAt]);

  if (loading) {
    return <LoadingState message="Loading recent events section..." />;
  }

  return (
    <section className="bg-lasa-50 py-10">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-lasa-600">Recent Events Section</h1>
            <p className="mt-1 text-sm text-lasa-500">
              Manage homepage carousel images and YouTube embeds.
            </p>
            <p className="mt-1 text-xs text-lasa-400">Last updated: {updatedAtLabel}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/dashboard"
              className="rounded-xl border border-lasa-200 bg-white px-4 py-2 text-sm font-semibold text-lasa-600 hover:bg-lasa-100"
            >
              Back to Sections
            </Link>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-lasa-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-lasa-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6">
            <ErrorState message={error} onRetry={loadSection} />
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-lasa-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-lasa-600">Carousel Images</h2>
                <p className="text-sm text-lasa-500">
                  Upload images and order them for the homepage carousel.
                </p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-lasa-200 bg-white px-3 py-2 text-xs font-semibold text-lasa-600 hover:bg-lasa-100">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(event) => handleUploadCarousel(Array.from(event.target.files || []))}
                />
                {uploading ? 'Uploading...' : 'Upload Images'}
              </label>
            </div>

            {content.carouselItems.length ? (
              <div className="mt-5 space-y-4">
                {content.carouselItems.map((item, index) => (
                  <div key={`${item.imageUrl}-${index}`} className="rounded-xl border border-lasa-200 p-3">
                    <div className="flex flex-wrap items-start gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.altText || `Carousel ${index + 1}`}
                        className="h-24 w-32 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1 space-y-2">
                        <p className="text-xs text-lasa-400">Image {index + 1}</p>
                        <input
                          type="text"
                          value={item.altText || ''}
                          onChange={(event) => {
                            const altText = event.target.value;
                            setContent((prev) => ({
                              ...prev,
                              carouselItems: prev.carouselItems.map((entry, entryIndex) => (
                                entryIndex === index ? { ...entry, altText } : entry
                              )),
                            }));
                          }}
                          placeholder="Alt text"
                          className="w-full rounded-lg border border-lasa-200 px-3 py-2 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                        />
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setContent((prev) => ({
                              ...prev,
                              carouselItems: moveItem(prev.carouselItems, index, index - 1),
                            }))}
                            disabled={index === 0}
                            className="rounded-lg border border-lasa-200 bg-white px-3 py-1.5 text-xs font-semibold text-lasa-600 hover:bg-lasa-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Move Up
                          </button>
                          <button
                            type="button"
                            onClick={() => setContent((prev) => ({
                              ...prev,
                              carouselItems: moveItem(prev.carouselItems, index, index + 1),
                            }))}
                            disabled={index === content.carouselItems.length - 1}
                            className="rounded-lg border border-lasa-200 bg-white px-3 py-1.5 text-xs font-semibold text-lasa-600 hover:bg-lasa-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Move Down
                          </button>
                          <button
                            type="button"
                            onClick={() => setContent((prev) => ({
                              ...prev,
                              carouselItems: withOrder(prev.carouselItems.filter((_, itemIndex) => itemIndex !== index)),
                            }))}
                            className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5">
                <EmptyState title="No carousel images yet." />
              </div>
            )}
          </article>

          <article className="rounded-2xl border border-lasa-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-lasa-600">YouTube Embeds</h2>
            <p className="mt-1 text-sm text-lasa-500">
              Add YouTube links in the exact order they should appear.
            </p>

            <div className="mt-4 grid gap-3">
              <input
                type="url"
                value={youtubeForm.youtubeUrl}
                onChange={(event) => setYoutubeForm((prev) => ({ ...prev, youtubeUrl: event.target.value }))}
                placeholder="Optional YouTube link"
                className="w-full rounded-lg border border-lasa-200 px-3 py-2 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
              />
              <input
                type="text"
                value={youtubeForm.title}
                onChange={(event) => setYoutubeForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Optional title"
                className="w-full rounded-lg border border-lasa-200 px-3 py-2 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
              />
              <textarea
                value={youtubeForm.description}
                onChange={(event) => setYoutubeForm((prev) => ({ ...prev, description: event.target.value }))}
                rows={3}
                placeholder="Optional description"
                className="w-full rounded-lg border border-lasa-200 px-3 py-2 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
              />
              <button
                type="button"
                onClick={addYoutubeItem}
                className="inline-flex w-fit rounded-lg bg-lasa-600 px-3 py-2 text-xs font-semibold text-white hover:bg-lasa-700"
              >
                Add YouTube Link
              </button>
            </div>

            {content.youtubeItems.length ? (
              <div className="mt-5 space-y-4">
                {content.youtubeItems.map((item, index) => (
                  <div key={`${item.videoId || item.youtubeUrl || 'yt'}-${index}`} className="rounded-xl border border-lasa-200 p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-xs text-lasa-400">Video {index + 1}</p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setContent((prev) => ({
                            ...prev,
                            youtubeItems: moveItem(prev.youtubeItems, index, index - 1),
                          }))}
                          disabled={index === 0}
                          className="rounded-lg border border-lasa-200 bg-white px-3 py-1.5 text-xs font-semibold text-lasa-600 hover:bg-lasa-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Up
                        </button>
                        <button
                          type="button"
                          onClick={() => setContent((prev) => ({
                            ...prev,
                            youtubeItems: moveItem(prev.youtubeItems, index, index + 1),
                          }))}
                          disabled={index === content.youtubeItems.length - 1}
                          className="rounded-lg border border-lasa-200 bg-white px-3 py-1.5 text-xs font-semibold text-lasa-600 hover:bg-lasa-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Down
                        </button>
                        <button
                          type="button"
                          onClick={() => setContent((prev) => ({
                            ...prev,
                            youtubeItems: withOrder(prev.youtubeItems.filter((_, itemIndex) => itemIndex !== index)),
                          }))}
                          className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <p className="mt-2 break-all text-sm text-lasa-500">
                      {item.youtubeUrl || item.videoId}
                    </p>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(event) => {
                        const title = event.target.value;
                        setContent((prev) => ({
                          ...prev,
                          youtubeItems: prev.youtubeItems.map((entry, entryIndex) => (
                            entryIndex === index ? { ...entry, title } : entry
                          )),
                        }));
                      }}
                      placeholder="Optional title"
                      className="mt-2 w-full rounded-lg border border-lasa-200 px-3 py-2 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                    />
                    <textarea
                      value={item.description || ''}
                      onChange={(event) => {
                        const description = event.target.value;
                        setContent((prev) => ({
                          ...prev,
                          youtubeItems: prev.youtubeItems.map((entry, entryIndex) => (
                            entryIndex === index ? { ...entry, description } : entry
                          )),
                        }));
                      }}
                      rows={3}
                      placeholder="Optional description"
                      className="mt-2 w-full rounded-lg border border-lasa-200 px-3 py-2 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                    />

                    {getEmbedUrl(item) && (
                      <div className="mt-3 overflow-hidden rounded-lg border border-lasa-200" style={{ aspectRatio: '16 / 9' }}>
                        <iframe
                          className="h-full w-full"
                          src={getEmbedUrl(item)}
                          title={item.title || `Recent event video ${index + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5">
                <EmptyState title="No YouTube links yet." />
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
