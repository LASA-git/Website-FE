import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCurrentEvents } from '../api/events';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import EventCard from '../components/events/EventCard';
import { CONTACT } from '../constants/contact';
import { shareEvent } from '../utils/shareEvent';

export default function Events() {
  const actionButtonBaseClass =
    'inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-full border px-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lasa-300';
  const contactButtonClass =
    `${actionButtonBaseClass} border-lasa-500 bg-gradient-to-r from-lasa-600 to-lasa-500 text-white shadow-sm hover:from-lasa-700 hover:to-lasa-600`;
  const shareButtonClass =
    `${actionButtonBaseClass} border-lasa-300 bg-white text-lasa-700 shadow-sm hover:border-lasa-400 hover:bg-lasa-100 disabled:cursor-not-allowed disabled:opacity-60`;
  const registerButtonClass =
    `${actionButtonBaseClass} border-amber-600 bg-amber-500 text-white shadow-sm hover:bg-amber-600`;
  const quickContactClass =
    'inline-flex h-7 w-full items-center justify-center gap-1 rounded-full border border-lasa-300 bg-lasa-50 px-2 text-[10px] font-semibold uppercase tracking-wide text-lasa-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-lasa-400 hover:bg-lasa-100';

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shareState, setShareState] = useState({});

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

  const handleShare = async (event) => {
    const eventId = event?._id || event?.id;
    if (!eventId) return;

    setShareState((prev) => ({
      ...prev,
      [eventId]: { loading: true, message: '' },
    }));

    try {
      const shareResult = await shareEvent({
        title: event.title || 'LASA Event',
        text: event.description
          ? event.description.slice(0, 180)
          : 'Join this LASA event and be part of community service.',
        url: `${window.location.origin}/events/${eventId}`,
      });

      setShareState((prev) => ({
        ...prev,
        [eventId]: {
          loading: false,
          message: shareResult === 'copied' ? 'Link copied.' : '',
        },
      }));
    } catch (err) {
      setShareState((prev) => ({
        ...prev,
        [eventId]: {
          loading: false,
          message: err?.name === 'AbortError' ? '' : 'Unable to share.',
        },
      }));
    }
  };

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
                  actions={
                    <div className="w-full min-h-[6.25rem]">
                      <div className={`grid gap-2 ${event.registrationLink ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {event.registrationLink && (
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noreferrer"
                            className={registerButtonClass}
                          >
                            Register
                          </a>
                        )}
                        <Link
                          to="/contact"
                          className={contactButtonClass}
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Contact
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleShare(event)}
                          disabled={shareState[event._id || event.id]?.loading}
                          className={shareButtonClass}
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C9.886 12.588 11.304 12 12.75 12c2.426 0 4.774 1.328 6.75 3.75m-10.816-2.408C7.41 14.145 6.25 15.436 5.25 17.25M4.5 4.5h15v15h-15v-15z" />
                          </svg>
                          {shareState[event._id || event.id]?.loading ? 'Sharing...' : 'Share'}
                        </button>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <a href={CONTACT.phoneHref} className={quickContactClass}>
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Call
                        </a>
                        <a href={CONTACT.emailHref} className={quickContactClass}>
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email
                        </a>
                      </div>
                      <div className="mt-2 min-h-[1.25rem]">
                        {shareState[event._id || event.id]?.message && (
                          <span className="rounded-full bg-lasa-100 px-2 py-1 text-[11px] font-medium text-lasa-600">
                            {shareState[event._id || event.id]?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  }
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
