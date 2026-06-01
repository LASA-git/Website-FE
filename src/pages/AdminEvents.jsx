import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArchivedEvents, fetchCurrentEvents, deleteEvent } from '../api/events';
import { useAuth } from '../auth/AuthProvider';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import EventCard from '../components/events/EventCard';

export default function AdminEvents() {
  const { token, signOut } = useAuth();
  const [currentEvents, setCurrentEvents] = useState([]);
  const [archivedEvents, setArchivedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [current, archived] = await Promise.all([
        fetchCurrentEvents(),
        fetchArchivedEvents(),
      ]);
      setCurrentEvents(current || []);
      setArchivedEvents(archived || []);
    } catch (err) {
      setError(err?.message || 'Unable to load events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm('Delete this event? This cannot be undone.');
    if (!confirmDelete) return;

    setDeletingId(eventId);
    try {
      await deleteEvent(eventId, token);
      await loadEvents();
    } catch (err) {
      setError(err?.message || 'Unable to delete event');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <LoadingState message="Loading events..." />;
  }

  return (
    <section className="bg-lasa-50 py-10">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-lasa-600">Event Dashboard</h1>
            <p className="mt-1 text-sm text-lasa-500">
              Create, update, and manage LASA events.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/events/new"
              className="rounded-xl bg-lasa-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-lasa-700"
            >
              New Event
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
            <ErrorState message={error} onRetry={loadEvents} />
          </div>
        )}

        <div className="mt-8 space-y-10">
          <EventSection
            title="Current Year"
            events={currentEvents}
            emptyLabel="No current-year events yet."
            actions={(event) => (
              <AdminActions
                event={event}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            )}
          />
          <EventSection
            title="Archived"
            events={archivedEvents}
            emptyLabel="No archived events yet."
            actions={(event) => (
              <AdminActions
                event={event}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
}

function EventSection({ title, events, emptyLabel, actions }) {
  if (!events.length) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-lasa-600">{title}</h2>
        <div className="mt-4">
          <EmptyState title={emptyLabel} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-lasa-600">{title}</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id || event.id} event={event} actions={actions(event)} />
        ))}
      </div>
    </div>
  );
}

function AdminActions({ event, onDelete, deletingId }) {
  const eventId = event._id || event.id;
  return (
    <>
      <Link
        to={`/admin/events/${eventId}/edit`}
        className="rounded-lg border border-lasa-200 bg-white px-3 py-1.5 text-xs font-semibold text-lasa-600 hover:bg-lasa-100"
      >
        Edit
      </Link>
      {event.flyerUrl && (
        <a
          href={event.flyerUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-lasa-200 bg-white px-3 py-1.5 text-xs font-semibold text-lasa-600 hover:bg-lasa-100"
        >
          Download Flyer
        </a>
      )}
      <button
        type="button"
        onClick={() => onDelete(eventId)}
        disabled={deletingId === eventId}
        className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {deletingId === eventId ? 'Deleting...' : 'Delete'}
      </button>
    </>
  );
}
