import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchRecentEventsSection } from '../api/recentEvents';

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

export default function RecentEventsSection() {
  const [data, setData] = useState({ carouselItems: [], youtubeItems: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenImageUrl, setFullscreenImageUrl] = useState(null);

  const getYouTubeItemsPerPage = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }, []);

  const [youtubeItemsPerPage, setYouTubeItemsPerPage] = useState(getYouTubeItemsPerPage);
  const [youtubePage, setYouTubePage] = useState(0);

  const loadSection = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const section = await fetchRecentEventsSection();
      setData({
        carouselItems: section.carouselItems || [],
        youtubeItems: section.youtubeItems || [],
      });
      setCurrentIndex(0);
    } catch (err) {
      setError(err?.message || 'Unable to load recent events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSection();
  }, [loadSection]);

  const carouselItems = useMemo(() => data.carouselItems || [], [data.carouselItems]);
  const youtubeItems = useMemo(() => data.youtubeItems || [], [data.youtubeItems]);

  useEffect(() => {
    const handleResize = () => {
      setYouTubeItemsPerPage(getYouTubeItemsPerPage());
      setYouTubePage(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getYouTubeItemsPerPage]);

  useEffect(() => {
    if (carouselItems.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const goTo = (index) => {
    if (!carouselItems.length) return;
    const bounded = ((index % carouselItems.length) + carouselItems.length) % carouselItems.length;
    setCurrentIndex(bounded);
  };

  const youtubeTotalPages = Math.ceil(youtubeItems.length / youtubeItemsPerPage);
  const showYouTubeCarousel = youtubeItems.length > youtubeItemsPerPage;
  const visibleYouTubeItems = youtubeItems.slice(
    youtubePage * youtubeItemsPerPage,
    youtubePage * youtubeItemsPerPage + youtubeItemsPerPage
  );

  const goToYouTubePage = (page) => {
    if (!youtubeTotalPages) return;
    const bounded = ((page % youtubeTotalPages) + youtubeTotalPages) % youtubeTotalPages;
    setYouTubePage(bounded);
  };

  const openFullscreen = () => {
    const activeUrl = carouselItems[currentIndex]?.imageUrl;
    if (activeUrl) {
      setFullscreenImageUrl(activeUrl);
    }
  };

  return (
    <section className="w-full pt-4 pb-12 sm:pt-6 sm:pb-16 md:pt-8 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-display text-lasa-700 sm:text-3xl md:text-4xl">
            Recent Events
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-lasa-600/80 sm:text-base md:text-lg">
            Highlights from our past community service events and activities.
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl border border-lasa-200 bg-white p-8 text-center text-sm text-lasa-500">
            Loading recent events...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-10">
            <div>
              {carouselItems.length ? (
                <div
                  className="group relative mx-auto mt-4 max-w-4xl overflow-hidden rounded-2xl border border-lasa-200 bg-white shadow-lg"
                >
                  <div className="w-full" style={{ aspectRatio: '16 / 9' }}>
                    <img
                      src={carouselItems[currentIndex]?.imageUrl}
                      alt={carouselItems[currentIndex]?.altText || `Recent event image ${currentIndex + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={openFullscreen}
                    className="absolute right-3 top-3 rounded-lg border border-lasa-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-lasa-600 opacity-0 shadow transition-opacity hover:bg-white group-hover:opacity-100"
                    aria-label="View image in fullscreen"
                  >
                    View in Fullscreen
                  </button>

                  {carouselItems.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => goTo(currentIndex - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-lasa-200 bg-white/90 p-2 text-lasa-600 shadow hover:bg-white"
                        aria-label="Previous image"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => goTo(currentIndex + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-lasa-200 bg-white/90 p-2 text-lasa-600 shadow hover:bg-white"
                        aria-label="Next image"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/90 px-3 py-2">
                        {carouselItems.map((_, index) => (
                          <button
                            type="button"
                            key={index}
                            onClick={() => goTo(index)}
                            className={`h-2.5 rounded-full transition-all ${
                              index === currentIndex ? 'w-6 bg-lasa-600' : 'w-2.5 bg-lasa-300 hover:bg-lasa-400'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-lasa-200 bg-white p-8 text-center text-sm text-lasa-500">
                  No carousel images available right now.
                </div>
              )}
            </div>

            <div className="mx-auto w-full max-w-4xl py-2">
              <div className="h-px bg-gradient-to-r from-transparent via-lasa-300 to-transparent" />
            </div>

            <div>
              {youtubeItems.length ? (
                <div className="mt-4 space-y-4">
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${youtubeItemsPerPage}, minmax(0, 1fr))` }}
                  >
                  {visibleYouTubeItems.map((item, index) => {
                    const absoluteIndex = youtubePage * youtubeItemsPerPage + index;
                    const videoId = item.videoId || extractYouTubeVideoId(item.youtubeUrl);

                    return (
                      <article
                        key={`${item.videoId || item.youtubeUrl || 'yt'}-${absoluteIndex}`}
                        className="w-full overflow-hidden rounded-2xl border border-lasa-200 bg-white shadow"
                      >
                        <div className="w-full" style={{ aspectRatio: '16 / 9' }}>
                          {videoId ? (
                            <iframe
                              className="h-full w-full"
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={item.title || `Recent event video ${absoluteIndex + 1}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <div className="flex h-full flex-col items-center justify-center bg-lasa-100 px-4 text-center">
                              <svg className="mb-2 h-10 w-10 text-lasa-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                              </svg>
                              <p className="text-sm font-semibold text-lasa-500">Video coming soon</p>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="text-base font-semibold text-lasa-600">
                            {item.title || `Recent Event Video ${absoluteIndex + 1}`}
                          </p>
                          {item.description && (
                            <p className="mt-2 text-sm leading-relaxed text-lasa-500">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </article>
                    );
                  })}
                  </div>

                  {showYouTubeCarousel && (
                    <div className="flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => goToYouTubePage(youtubePage - 1)}
                        className="rounded-full border border-lasa-300 bg-white p-2 text-lasa-600 hover:bg-lasa-100"
                        aria-label="Previous YouTube items"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      <div className="flex gap-2">
                        {Array.from({ length: youtubeTotalPages }).map((_, page) => (
                          <button
                            type="button"
                            key={page}
                            onClick={() => goToYouTubePage(page)}
                            className={`h-2.5 rounded-full transition-all ${
                              page === youtubePage ? 'w-6 bg-lasa-600' : 'w-2.5 bg-lasa-300 hover:bg-lasa-400'
                            }`}
                            aria-label={`Go to YouTube page ${page + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => goToYouTubePage(youtubePage + 1)}
                        className="rounded-full border border-lasa-300 bg-white p-2 text-lasa-600 hover:bg-lasa-100"
                        aria-label="Next YouTube items"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-lasa-200 bg-white p-8 text-center text-sm text-lasa-500">
                  No YouTube highlights available right now.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {fullscreenImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setFullscreenImageUrl(null)}
            className="absolute right-4 top-4 rounded-lg border border-white/30 bg-black/60 px-3 py-1.5 text-sm font-semibold text-white hover:bg-black/80"
            aria-label="Close fullscreen image"
          >
            Close
          </button>
          <img
            src={fullscreenImageUrl}
            alt="Recent event fullscreen"
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain"
          />
        </div>
      )}
    </section>
  );
}
