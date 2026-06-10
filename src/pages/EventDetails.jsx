import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchEventById } from '../api/events';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { formatEventDate } from '../utils/dateDisplay';

export default function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadEvent() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEventById(eventId);
        if (isMounted) setEvent(data);
      } catch (err) {
        if (isMounted) setError(err?.message || 'Unable to load event details');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (eventId) loadEvent();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  const gallery = useMemo(() => event?.gallery || [], [event]);
  const heroImage = event?.coverImageUrl || event?.flyerUrl || gallery[0];

  if (loading) {
    return <LoadingState message="Loading event..." />;
  }

  if (error || !event) {
    return (
      <section className="bg-lasa-50 py-16">
        <div className="mx-auto w-full max-w-3xl px-6">
          <ErrorState message={error || 'Event not found.'} />
          <Link
            to="/events"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lasa-600 hover:text-lasa-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to events
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-lasa-50 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-lasa-600 hover:text-lasa-700"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to events
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-lasa-200 bg-white shadow-lg">
          <div className="border-b border-lasa-200 bg-lasa-50/80 px-4 py-5 sm:px-6 sm:py-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">
              {formatEventDate(event.startDate, { variant: 'full' })}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-lasa-700 sm:text-3xl">
              {event.title}
            </h1>
            {event.location && (
              <p className="mt-2 text-sm text-lasa-500 sm:text-base">{event.location}</p>
            )}
          </div>

          {heroImage && (
            <div className="bg-lasa-100 p-3 sm:p-4">
              <div className="mx-auto overflow-hidden rounded-2xl border border-lasa-200 bg-white" style={{ aspectRatio: '4 / 3' }}>
                <img
                  src={heroImage}
                  alt={event.title}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          )}

          <div className="grid gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-lasa-600">About this event</h2>
                <p className="mt-3 text-sm leading-relaxed text-lasa-500 whitespace-pre-wrap break-words">
                  {event.description || 'More details will be shared soon.'}
                </p>
              </div>

              {gallery.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-lasa-400">
                    Gallery
                  </h3>
                  <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                    {gallery.map((url, index) => (
                      <div key={`${url}-${index}`} className="overflow-hidden rounded-xl border border-lasa-200">
                        <img src={url} alt={`Gallery ${index + 1}`} className="h-28 w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-lasa-200 bg-lasa-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">Schedule</p>
                <p className="mt-2 text-sm font-semibold text-lasa-600">
                  {formatEventDate(event.startDate, { variant: 'full' })}
                </p>
                {event.location && (
                  <p className="mt-2 text-sm text-lasa-500">{event.location}</p>
                )}
              </div>

              {event.flyerUrl && (
                <a
                  href={event.flyerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lasa-600 px-4 py-3 text-sm font-semibold text-white hover:bg-lasa-700"
                >
                  Download flyer
                </a>
              )}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
