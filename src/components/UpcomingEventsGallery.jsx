import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCurrentEvents } from '../api/events';
import LoadingState from './common/LoadingState';
import ErrorState from './common/ErrorState';
import EmptyState from './common/EmptyState';
import EventCard from './events/EventCard';
import EventModal from './events/EventModal';

export default function UpcomingEventsGallery() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    <>
      <section className="w-full py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col gap-6 text-center">
            <div>
              <h2 className="text-2xl font-display text-lasa-700 sm:text-3xl md:text-4xl">
                Upcoming Events
              </h2>
              <p className="text-sm text-lasa-600/80 mt-3 max-w-2xl mx-auto sm:text-base md:text-lg">
                Stay updated with our upcoming community service events and activities.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 rounded-full border border-lasa-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-widest text-lasa-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-lasa-100"
              >
                Explore all events
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
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
                {events.slice(0, 3).map((event) => (
                  <EventCard
                    key={event._id || event.id}
                    event={event}
                    onClick={() => setSelectedEvent(event)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}
