import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArchivedEvents } from '../api/events';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import EventCard from '../components/events/EventCard';

export default function ArchivedEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArchivedEvents();
      setEvents(data || []);
    } catch (err) {
      setError(err?.message || 'Unable to load archived events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <section className="bg-lasa-50 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-lasa-600 sm:text-3xl">Archived Events</h1>
          <p className="mt-3 text-sm text-lasa-500 sm:text-base">
            A look back at LASA events that have already taken place.
          </p>
        </div>

        <div className="mt-10">
          {loading && <LoadingState message="Loading archived events..." />}
          {!loading && error && <ErrorState message={error} onRetry={loadEvents} />}
          {!loading && !error && !events.length && (
            <EmptyState
              title="No archived events"
              description="Past events will appear here as they are archived."
            />
          )}
          {!loading && !error && events.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event._id || event.id}
                  event={event}
                  to={`/events/${event._id || event.id}`}
                />
              ))}
            </div>
          )}

          {!loading && !error && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 rounded-full border border-lasa-200 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-lasa-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-lasa-100"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to events
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-lasa-200 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-lasa-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-lasa-100"
              >
                Back to home
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
