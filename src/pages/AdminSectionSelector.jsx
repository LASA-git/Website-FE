import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const SECTION_CARDS = [
  {
    title: 'Edit Recent Events Section',
    description: 'Manage homepage image carousel and YouTube embeds.',
    to: '/admin/recent-events',
    cta: 'Open Recent Events',
  },
  {
    title: 'Edit Activities Gallery',
    description: 'Manage healthcare, sociocare, and educare gallery images.',
    to: '/admin/activity-galleries',
    cta: 'Open Activities Gallery',
  },
  {
    title: 'Edit Events',
    description: 'Create and manage current-year event records.',
    to: '/admin/events?section=current',
    cta: 'Open Events',
  },
  {
    title: 'Edit Past Events Section',
    description: 'Manage archived/past events.',
    to: '/admin/events?section=archived',
    cta: 'Open Past Events',
  },
];

export default function AdminSectionSelector() {
  const { signOut } = useAuth();

  return (
    <section className="bg-lasa-50 py-10">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-lasa-600">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-lasa-500">
              Choose what you want to manage.
            </p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="rounded-xl border border-lasa-200 bg-white px-4 py-2 text-sm font-semibold text-lasa-600 hover:bg-lasa-100"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SECTION_CARDS.map((card) => (
            <article key={card.title} className="rounded-2xl border border-lasa-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-lasa-600">{card.title}</h2>
              <p className="mt-2 text-sm text-lasa-500">{card.description}</p>
              <Link
                to={card.to}
                className="mt-6 inline-flex rounded-xl bg-lasa-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-lasa-700"
              >
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
