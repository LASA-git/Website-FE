import { useEffect } from 'react';
import { formatEventDate } from '../../utils/dateDisplay';

export default function EventModal({ event, onClose }) {
  useEffect(() => {
    if (!event) return undefined;
    const handleKey = (evt) => {
      if (evt.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [event, onClose]);

  if (!event) return null;

  const image = event.coverImageUrl || event.flyerUrl || event.gallery?.[0];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(evt) => evt.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-lasa-200 bg-white px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">
              {formatEventDate(event.startDate, { variant: 'long' })}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-lasa-600">{event.title}</h2>
            {event.location && (
              <p className="mt-1 text-sm text-lasa-500">{event.location}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-lasa-200 p-2 text-lasa-500 hover:bg-lasa-100"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {image && (
          <div className="border-b border-lasa-200 bg-lasa-50">
            <img
              src={image}
              alt={event.title}
              className="h-auto max-h-[70vh] w-full object-contain"
            />
          </div>
        )}

        <div className="space-y-4 px-6 py-5">
          <div className="rounded-xl border border-lasa-200 bg-lasa-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">Schedule</p>
            <p className="mt-1 text-sm font-semibold text-lasa-600">
              {formatEventDate(event.startDate, { variant: 'long' })}
            </p>
            {event.location && (
              <p className="mt-1 text-sm text-lasa-500">{event.location}</p>
            )}
          </div>
          {event.description ? (
            <p className="text-sm leading-relaxed text-lasa-500 whitespace-pre-wrap break-words">{event.description}</p>
          ) : (
            <p className="text-sm text-lasa-500">No description provided yet.</p>
          )}

          {event.gallery?.length ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">Gallery</p>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                {event.gallery.map((url, index) => (
                  <div key={`${url}-${index}`} className="overflow-hidden rounded-xl border border-lasa-200">
                    <img src={url} alt={`Gallery ${index + 1}`} className="h-28 w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {event.flyerUrl && (
            <a
              href={event.flyerUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-lasa-600 px-4 py-2 text-sm font-semibold text-white hover:bg-lasa-700"
            >
              Download flyer
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
