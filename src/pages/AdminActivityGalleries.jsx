import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchActivityGalleries, updateActivityGallery } from '../api/activityGalleries';
import { uploadMedia } from '../api/media';
import { useAuth } from '../auth/AuthProvider';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';

const SECTION_META = {
  healthcare: {
    label: 'Healthcare',
    description: 'Barrier-free medical care, support, and wellness services.',
    folder: 'activities/healthcare',
  },
  sociocare: {
    label: 'Sociocare',
    description: 'Food security, crisis outreach, and social upliftment.',
    folder: 'activities/sociocare',
  },
  educare: {
    label: 'Educare',
    description: 'Learning, character development, and family empowerment.',
    folder: 'activities/educare',
  },
};

const INITIAL_FORM = {
  imageUrl: '',
  caption: '',
  altText: '',
};

function normalizeItems(items) {
  return (items || []).map((item, index) => ({
    imageUrl: item.imageUrl || '',
    caption: item.caption || '',
    altText: item.altText || '',
    order: index,
  }));
}

function moveItem(items, fromIndex, toIndex) {
  if (toIndex < 0 || toIndex >= items.length) return items;

  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next.map((item, index) => ({ ...item, order: index }));
}

export default function AdminActivityGalleries() {
  const { token, signOut } = useAuth();
  const [selectedSection, setSelectedSection] = useState('healthcare');
  const [content, setContent] = useState({ healthcare: [], sociocare: [], educare: [], updatedAt: null });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const loadGallery = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchActivityGalleries();
      setContent({
        healthcare: normalizeItems(data.healthcare),
        sociocare: normalizeItems(data.sociocare),
        educare: normalizeItems(data.educare),
        updatedAt: data.updatedAt,
      });
    } catch (err) {
      setError(err?.message || 'Unable to load activity galleries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const currentItems = content[selectedSection] || [];
  const currentMeta = SECTION_META[selectedSection];

  const updatedAtLabel = useMemo(() => {
    if (!content.updatedAt) return 'Not saved yet';
    return new Date(content.updatedAt).toLocaleString();
  }, [content.updatedAt]);

  const handleUpload = async (file) => {
    setUploading(true);
    setError(null);
    try {
      const imageUrl = await uploadMedia({ file, folder: currentMeta.folder }, token);
      setForm((prev) => ({
        ...prev,
        imageUrl,
        altText: prev.altText || '',
      }));
    } catch (err) {
      setError(err?.message || 'Unable to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleAddItem = () => {
    if (!form.imageUrl) {
      setError('Please upload an image first.');
      return;
    }

    setError(null);
    setContent((prev) => ({
      ...prev,
      [selectedSection]: normalizeItems([
        ...(prev[selectedSection] || []),
        {
          imageUrl: form.imageUrl,
          caption: form.caption.trim(),
          altText: form.altText.trim(),
        },
      ]),
    }));
    setForm(INITIAL_FORM);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const saved = await updateActivityGallery(
        selectedSection,
        currentItems.map((item, index) => ({
          imageUrl: item.imageUrl,
          caption: item.caption || '',
          altText: item.altText || '',
          order: index,
        })),
        token
      );

      setContent((prev) => ({
        ...prev,
        healthcare: selectedSection === 'healthcare' ? normalizeItems(saved.healthcare) : prev.healthcare,
        sociocare: selectedSection === 'sociocare' ? normalizeItems(saved.sociocare) : prev.sociocare,
        educare: selectedSection === 'educare' ? normalizeItems(saved.educare) : prev.educare,
        updatedAt: saved.updatedAt,
      }));
    } catch (err) {
      setError(err?.message || 'Unable to save gallery');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading activity galleries..." />;
  }

  return (
    <section className="bg-lasa-50 py-10">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-lasa-600">Activities Gallery</h1>
            <p className="mt-1 text-sm text-lasa-500">
              Edit healthcare, sociocare, and educare gallery images.
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
              onClick={signOut}
              className="rounded-xl border border-lasa-200 bg-white px-4 py-2 text-sm font-semibold text-lasa-600 hover:bg-lasa-100"
            >
              Sign Out
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6">
            <ErrorState message={error} onRetry={loadGallery} />
          </div>
        )}

        <div className="mt-8 inline-flex flex-wrap gap-2 rounded-2xl border border-lasa-200 bg-white p-2">
          {Object.entries(SECTION_META).map(([key, meta]) => (
            <button
              type="button"
              key={key}
              onClick={() => setSelectedSection(key)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                selectedSection === key
                  ? 'bg-lasa-600 text-white'
                  : 'text-lasa-600 hover:bg-lasa-100'
              }`}
            >
              {meta.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <article className="rounded-2xl border border-lasa-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-lasa-500">
              Editing {currentMeta.label}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-lasa-700">{currentMeta.description}</h2>
            <p className="mt-2 text-sm text-lasa-500">
              Upload an image, optionally add a caption, then add it to the current gallery.
            </p>

            <div className="mt-5 space-y-4 rounded-2xl border border-lasa-200 bg-lasa-50/60 p-4">
              {form.imageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-lasa-200 bg-white">
                  <img src={form.imageUrl} alt={form.altText || 'Selected upload'} className="h-56 w-full object-cover" />
                </div>
              ) : (
                <EmptyState title="No image selected yet." description="Upload one to begin." />
              )}

              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-lasa-200 bg-white px-4 py-2 text-sm font-semibold text-lasa-600 hover:bg-lasa-100">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) handleUpload(file);
                  }}
                />
                {uploading ? 'Uploading...' : 'Upload Image'}
              </label>

              <input
                type="text"
                value={form.caption}
                onChange={(event) => setForm((prev) => ({ ...prev, caption: event.target.value }))}
                placeholder="Caption (optional)"
                className="w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
              />
              <input
                type="text"
                value={form.altText}
                onChange={(event) => setForm((prev) => ({ ...prev, altText: event.target.value }))}
                placeholder="Alt text (optional)"
                className="w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
              />
              <button
                type="button"
                onClick={handleAddItem}
                disabled={!form.imageUrl}
                className="rounded-xl bg-lasa-600 px-4 py-2 text-sm font-semibold text-white hover:bg-lasa-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Add to {currentMeta.label}
              </button>
            </div>
          </article>

          <article className="rounded-2xl border border-lasa-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-lasa-600">{currentMeta.label} Gallery</h2>
                <p className="text-sm text-lasa-500">
                  Reorder images, update captions, and save the active section.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-lasa-600 px-4 py-2 text-sm font-semibold text-white hover:bg-lasa-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {currentItems.length ? (
              <div className="mt-6 space-y-4">
                {currentItems.map((item, index) => (
                  <div key={`${item.imageUrl}-${index}`} className="rounded-2xl border border-lasa-200 p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                      <img
                        src={item.imageUrl}
                        alt={item.altText || item.caption || `Gallery image ${index + 1}`}
                        className="h-32 w-full rounded-2xl object-cover md:w-40"
                      />
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">
                            Image {index + 1}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setContent((prev) => ({
                                ...prev,
                                [selectedSection]: moveItem(prev[selectedSection], index, index - 1),
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
                                [selectedSection]: moveItem(prev[selectedSection], index, index + 1),
                              }))}
                              disabled={index === currentItems.length - 1}
                              className="rounded-lg border border-lasa-200 bg-white px-3 py-1.5 text-xs font-semibold text-lasa-600 hover:bg-lasa-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Down
                            </button>
                            <button
                              type="button"
                              onClick={() => setContent((prev) => ({
                                ...prev,
                                [selectedSection]: normalizeItems(
                                  prev[selectedSection].filter((_, itemIndex) => itemIndex !== index)
                                ),
                              }))}
                              className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <input
                          type="text"
                          value={item.caption || ''}
                          onChange={(event) => {
                            const caption = event.target.value;
                            setContent((prev) => ({
                              ...prev,
                              [selectedSection]: prev[selectedSection].map((entry, entryIndex) => (
                                entryIndex === index ? { ...entry, caption } : entry
                              )),
                            }));
                          }}
                          placeholder="Caption (optional)"
                          className="w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                        />
                        <input
                          type="text"
                          value={item.altText || ''}
                          onChange={(event) => {
                            const altText = event.target.value;
                            setContent((prev) => ({
                              ...prev,
                              [selectedSection]: prev[selectedSection].map((entry, entryIndex) => (
                                entryIndex === index ? { ...entry, altText } : entry
                              )),
                            }));
                          }}
                          placeholder="Alt text (optional)"
                          className="w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState title={`No ${currentMeta.label.toLowerCase()} images yet.`} />
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
