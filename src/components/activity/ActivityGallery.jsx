import { useEffect, useMemo, useState } from 'react';

function getItemsPerRow() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1280) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

export default function ActivityGallery({
  title,
  description,
  items = [],
  className = '',
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(getItemsPerRow);

  const galleryItems = useMemo(
    () => (items || []).filter((item) => item?.imageUrl),
    [items]
  );

  const initialVisibleCount = itemsPerRow * 2;
  const hasMore = galleryItems.length > initialVisibleCount;
  const visibleItems = expanded || !hasMore
    ? galleryItems
    : galleryItems.slice(0, initialVisibleCount);

  const selectedItem = selectedIndex !== null ? galleryItems[selectedIndex] : null;
  const selectedCaption =
    selectedItem?.caption?.trim() || selectedItem?.altText?.trim() || '';

  useEffect(() => {
    const handleResize = () => setItemsPerRow(getItemsPerRow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setExpanded(false);
  }, [galleryItems.length]);

  const goToImage = (index) => {
    if (!galleryItems.length) return;
    const bounded = ((index % galleryItems.length) + galleryItems.length) % galleryItems.length;
    setSelectedIndex(bounded);
  };

  const closeFullscreen = () => setSelectedIndex(null);

  useEffect(() => {
    if (selectedIndex === null) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeFullscreen();
      } else if (event.key === 'ArrowLeft') {
        goToImage(selectedIndex - 1);
      } else if (event.key === 'ArrowRight') {
        goToImage(selectedIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, galleryItems.length]);

  return (
    <section className={`w-full ${className}`.trim()}>
      <div className="mx-auto w-full max-w-6xl">
        {(title || description) && (
          <div className="mb-6 text-center">
            {title && <h2 className="text-2xl font-display text-lasa-700 sm:text-3xl md:text-4xl">{title}</h2>}
            {description && (
              <p className="mx-auto mt-3 max-w-3xl text-sm text-lasa-600/80 sm:text-base md:text-lg">
                {description}
              </p>
            )}
          </div>
        )}

        {galleryItems.length ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleItems.map((item, index) => {
                const caption = item.caption?.trim() || item.altText?.trim() || '';

                return (
                  <button
                    type="button"
                    key={`${item.imageUrl}-${index}`}
                    onClick={() => setSelectedIndex(index)}
                    className="group overflow-hidden rounded-3xl border border-lasa-200 bg-white text-left shadow-[0_18px_40px_-28px_rgba(30,58,52,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-lasa-100">
                      <img
                        src={item.imageUrl}
                        alt={caption || `Gallery image ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-4 pb-4 pt-10">
                        <p className="line-clamp-2 text-sm font-medium text-white">
                          {caption || ' '}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {hasMore && !expanded && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="text-sm font-semibold text-lasa-600 transition-colors hover:text-lasa-700"
                >
                  ...see more
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-lasa-200 bg-white p-8 text-center text-sm text-lasa-500 shadow-sm">
            Gallery images coming soon.
          </div>
        )}
      </div>

      {selectedItem?.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeFullscreen}
        >
          <button
            type="button"
            onClick={closeFullscreen}
            className="absolute right-4 top-4 z-10 rounded-lg border border-white/30 bg-black/60 px-3 py-1.5 text-sm font-semibold text-white hover:bg-black/80"
            aria-label="Close fullscreen image"
          >
            Close
          </button>

          {galleryItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToImage(selectedIndex - 1);
                }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/60 p-3 text-white transition-colors hover:bg-black/80"
                aria-label="Previous image"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToImage(selectedIndex + 1);
                }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/60 p-3 text-white transition-colors hover:bg-black/80"
                aria-label="Next image"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            className="flex max-h-[90vh] max-w-[95vw] flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedItem.imageUrl}
              alt={selectedCaption || `Gallery image ${selectedIndex + 1}`}
              className="max-h-[78vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 max-w-2xl text-center">
              {selectedCaption ? (
                <p className="text-base font-medium text-white sm:text-lg">{selectedCaption}</p>
              ) : null}
              {galleryItems.length > 1 && (
                <p className="mt-2 text-sm text-white/70">
                  {selectedIndex + 1} / {galleryItems.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
