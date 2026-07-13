import { useEffect, useMemo, useState } from 'react';

export default function ActivityGallery({
  title,
  description,
  items = [],
  className = '',
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = useMemo(
    () => (items || []).filter((item) => item?.imageUrl),
    [items]
  );

  useEffect(() => {
    if (!selectedImage) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

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
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item, index) => {
              const caption = item.caption?.trim() || item.altText?.trim() || '';

              return (
                <button
                  type="button"
                  key={`${item.imageUrl}-${index}`}
                  onClick={() => setSelectedImage(item.imageUrl)}
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
        ) : (
          <div className="rounded-2xl border border-lasa-200 bg-white p-8 text-center text-sm text-lasa-500 shadow-sm">
            Gallery images coming soon.
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-lg border border-white/30 bg-black/60 px-3 py-1.5 text-sm font-semibold text-white hover:bg-black/80"
            aria-label="Close fullscreen image"
          >
            Close
          </button>
          <img
            src={selectedImage}
            alt="Activity gallery fullscreen"
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
