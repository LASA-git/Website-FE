import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCurrentEvents } from '../api/events';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import EventCard from '../components/events/EventCard';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCurrentEvents();
      setEvents(data || []);
    } catch (err) {
      setError(err?.message || 'Unable to load events');
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
          <h1 className="text-2xl font-semibold text-lasa-600 sm:text-3xl">Events</h1>
          <p className="mt-3 text-sm text-lasa-500 sm:text-base">
            Discover LASA community events and service activities.
          </p>
        </div>

        <div className="mt-10">
          {loading && <LoadingState message="Loading events..." />}
          {!loading && error && <ErrorState message={error} onRetry={loadEvents} />}
          {!loading && !error && !events.length && (
            <EmptyState
              title="No upcoming events"
              description="Check back soon for new LASA events."
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
            <div className="mt-12 flex items-center justify-center">
              <Link
                to="/archived-events"
                className="inline-flex items-center gap-2 rounded-full border border-lasa-200 bg-white px-6 py-3 text-sm font-semibold text-lasa-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-lasa-100"
              >
                View archived events
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
