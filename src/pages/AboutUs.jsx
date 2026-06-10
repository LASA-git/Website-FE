import ScrollReveal from '../components/common/ScrollReveal';
import { revealDelay } from '../constants/motion';

const CORE_VALUES = [
  {
    title: 'Truth',
    cue: 'Transparent action',
    description: 'Operating with transparency, integrity, and accountability in all activities.',
  },
  {
    title: 'Right Conduct',
    cue: 'Ethical leadership',
    description: 'Maintaining ethical leadership and responsible stewardship of community resources.',
  },
  {
    title: 'Peace',
    cue: 'Community harmony',
    description: 'Fostering harmony, understanding, and unity across diverse cultural demographics.',
  },
  {
    title: 'Love',
    cue: 'Compassion first',
    description: 'Serving every individual with compassion, dignity, respect, and empathy.',
  },
  {
    title: 'Non-Violence',
    cue: 'Safe inclusion',
    description: 'Cultivating a safe, supportive, and inclusive environment for all.',
  },
];

const MISSION_MARKERS = ['Volunteer-led', 'Non-denominational', 'Community-centered'];

export default function AboutUs() {
  return (
    <section className="relative overflow-hidden bg-lasa-50 pb-14 sm:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_14%_8%,rgba(79,122,106,0.22),transparent_48%),radial-gradient(circle_at_84%_14%,rgba(134,160,125,0.28),transparent_50%)]" />

      <div className="relative border-b border-lasa-200 bg-gradient-to-b from-lasa-100/95 via-lasa-100/70 to-lasa-50/90">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <ScrollReveal delay={revealDelay(0, { base: 20 })}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lasa-500">
              About LASA Foundation Inc.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={revealDelay(1, { base: 20 })}>
            <h1 className="reading-title mt-3 text-4xl font-display text-lasa-700 sm:text-6xl">
              Our Mission
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={revealDelay(2, { base: 20 })}>
            <p className="reading-copy mt-5 text-[15px] text-lasa-600 sm:text-[1.03rem]">
              LASA Foundation Inc. is a non-denominational, entirely volunteer-led charitable
              organization headquartered in Lowell, Massachusetts. We are dedicated to delivering
              impactful humanitarian service and essential resources to underserved, low-income,
              and vulnerable populations.
            </p>
          </ScrollReveal>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {MISSION_MARKERS.map((marker, index) => (
              <ScrollReveal key={marker} delay={revealDelay(index, { base: 310 })} direction="up">
                <span className="inline-flex items-center rounded-full border border-lasa-200 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-lasa-600">
                  {marker}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <ScrollReveal direction="up">
          <div className="narrative-panel rounded-3xl p-6 sm:p-8">
            <p className="reading-kicker text-[11px] font-semibold uppercase text-lasa-500">
              Guiding Principle
            </p>
            <h2 className="reading-subtitle mt-2 text-3xl font-display text-lasa-700 sm:text-4xl">
              Love All, Serve All
            </h2>
            <p className="reading-copy mt-4 text-[15px] text-lasa-600 sm:text-base">
              Our foundation operates on the acronym LASA, which stands for "Love All, Serve All."
              This principle reflects the core philosophical message of Sri Sathya Sai Baba,
              shaping a culture where service is practical, compassionate, and unconditional.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10">
          <ScrollReveal>
            <h2 className="reading-subtitle text-3xl font-semibold text-lasa-700 sm:text-4xl">
              Our Core Values
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={revealDelay(0, { base: 90, step: 90 })}>
            <p className="reading-copy-tight mt-2 text-[15px] text-lasa-500 sm:text-base">
              Our initiatives, programs, and community partnerships are anchored in five universal
              human values.
            </p>
          </ScrollReveal>

          <div className="mt-6 grid gap-4 md:grid-cols-2 md:[grid-auto-rows:1fr] xl:grid-cols-3">
            {CORE_VALUES.map((value, index) => (
              <ScrollReveal
                key={value.title}
                delay={revealDelay(index, { base: 140 })}
                direction={index % 2 === 0 ? 'up' : 'right'}
              >
                <article className="uniform-card narrative-card group rounded-3xl border border-lasa-200 bg-white/95 p-6 shadow-[0_20px_40px_-30px_rgba(30,58,52,0.55)] transition-all duration-500 hover:-translate-y-1 hover:border-lasa-300 hover:shadow-lg">
                  <p className="reading-kicker text-[11px] font-semibold uppercase text-lasa-400">
                    {value.cue}
                  </p>
                  <h3 className="reading-subtitle mt-2 text-xl font-semibold text-lasa-700">
                    {value.title}
                  </h3>
                  <p className="reading-copy-tight mt-3 text-[15px] text-lasa-600">
                    {value.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={revealDelay(0, { base: 180 })} direction="up">
          <div className="mt-10 rounded-3xl border border-lasa-200 bg-gradient-to-r from-white to-lasa-100/70 p-6 shadow-sm sm:p-8">
            <p className="reading-kicker text-[11px] font-semibold uppercase text-lasa-500">
              Why It Matters
            </p>
            <p className="reading-copy mt-3 text-[15px] text-lasa-600 sm:text-base">
              We do not view service as isolated projects. We see it as a continuous promise to
              stand beside communities with consistency, dignity, and care.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
