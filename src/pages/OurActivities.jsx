import { Link } from 'react-router-dom';

const ACTIVITY_TRACKS = [
  {
    label: 'Healthcare',
    title: 'Barrier-free wellness for vulnerable communities',
    highlights: [
      'Free clinics, preventive care support, and compassionate services that make access to quality healthcare practical and humane.',
    ],
    route: '/our-activities/healthcare',
    accent: 'from-teal-100 to-lasa-50',
  },
  {
    label: 'Sociocare',
    title: 'Food security and social upliftment with dignity',
    highlights: [
      'Community programs focused on hunger relief, refugee support, crisis outreach, and neighborhood-level wellbeing.',
    ],
    route: '/our-activities/sociocare',
    accent: 'from-lime-100 to-lasa-50',
  },
  {
    label: 'Educare',
    title: 'Character-centered learning and family empowerment',
    highlights: [
      'Tutoring, life skills, and value-based learning experiences that help children and families build resilience for the long term.',
    ],
    route: '/our-activities/educare',
    accent: 'from-emerald-100 to-lasa-50',
  },
];

const SERVICE_RHYTHM = [
  {
    step: 'Listen',
    description: 'We start by understanding local needs through direct conversations and partnerships.',
  },
  {
    step: 'Serve',
    description: 'Programs are designed for dignity, practicality, and immediate community relevance.',
  },
  {
    step: 'Sustain',
    description: 'We create continuity with repeat outreach cycles and long-term family support.',
  },
];

export default function OurActivities() {
  return (
    <section className="relative overflow-hidden bg-lasa-50 pb-14 sm:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_18%_18%,rgba(79,122,106,0.24),transparent_55%),radial-gradient(circle_at_84%_8%,rgba(134,160,125,0.22),transparent_48%)]" />

      <div className="relative border-b border-lasa-200 bg-gradient-to-b from-lasa-100/90 via-lasa-100/60 to-lasa-50">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="reading-kicker text-xs font-semibold uppercase text-lasa-500">
            Our Activities
          </p>
          <h1 className="reading-title mt-3 max-w-4xl text-4xl font-display text-lasa-700 sm:text-6xl">
            Service areas designed for steady, human-centered impact
          </h1>
          <ul className="reading-copy mt-5 list-disc space-y-2 pl-5 text-[15px] text-lasa-600 sm:text-[1.03rem]">
            <li>
              Instead of overwhelming communities with one-time interventions, we run focused,
              interconnected activity tracks that meet real needs at the right time and in the
              right way.
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <h2 className="reading-subtitle text-3xl font-semibold text-lasa-700 sm:text-4xl">
          Explore Our Tracks
        </h2>
        <p className="reading-copy-tight mt-2 text-[15px] text-lasa-500 sm:text-base">
          Each program area has its own rhythm, expertise, and delivery model while staying
          rooted in the same values.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3 lg:[grid-auto-rows:1fr]">
          {ACTIVITY_TRACKS.map((track) => (
            <article
              key={track.label}
              className="uniform-card narrative-card group rounded-3xl border border-lasa-200 bg-white p-6 shadow-[0_20px_40px_-32px_rgba(30,58,52,0.55)] transition-all duration-500 hover:-translate-y-1 hover:border-lasa-300 hover:shadow-lg"
            >
              <p
                className={`reading-kicker inline-flex w-fit rounded-full border border-lasa-200 bg-gradient-to-r px-3 py-1 text-[11px] font-semibold uppercase text-lasa-600 ${track.accent}`}
              >
                {track.label}
              </p>
              <h3 className="reading-subtitle mt-4 text-xl font-semibold text-lasa-700">
                {track.title}
              </h3>
              <ul className="reading-copy-tight mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-lasa-600">
                {track.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <Link
                to={track.route}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-lasa-300 bg-lasa-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-lasa-600 transition-all hover:border-lasa-400 hover:bg-lasa-100"
              >
                View Program
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-stretch">
          <div className="h-full rounded-3xl border border-lasa-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="reading-kicker text-xs font-semibold uppercase text-lasa-500">
              How We Deliver
            </p>
            <h3 className="reading-subtitle mt-3 text-2xl font-semibold text-lasa-700 sm:text-3xl">
              A service rhythm built for consistency, not noise
            </h3>
            <ul className="reading-copy mt-4 list-disc space-y-2 pl-5 text-[15px] text-lasa-600 sm:text-base">
              <li>
                Our activities are intentionally paced to avoid information overload for
                volunteers, partners, and families. Every cycle starts small, scales
                responsibly, and improves through feedback.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            {SERVICE_RHYTHM.map((item, index) => (
              <article
                key={item.step}
                className="narrative-card rounded-2xl border border-lasa-200 bg-lasa-100/55 p-4"
              >
                <p className="reading-kicker text-xs font-semibold uppercase text-lasa-500">
                  Step {index + 1}
                </p>
                <h4 className="reading-subtitle mt-1 text-lg font-semibold text-lasa-700">
                  {item.step}
                </h4>
                <p className="reading-copy-tight mt-2 text-[15px] text-lasa-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-lasa-200 bg-gradient-to-r from-lasa-700 to-lasa-600 p-6 text-white shadow-lg sm:p-8">
          <h3 className="reading-title mt-3 text-3xl font-display sm:text-4xl">
            Bring your time, heart, and skills
          </h3>
          <ul className="reading-copy mt-4 list-disc space-y-2 pl-5 text-[15px] text-lasa-100 sm:text-base">
            <li>
              Whether you are a student, professional, or community member, there is a place
              for you in our service ecosystem.
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/volunteer"
              className="inline-flex items-center rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wide text-lasa-700 transition-all hover:-translate-y-0.5"
            >
              Volunteer with us
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-lasa-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              Contact team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
