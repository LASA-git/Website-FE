const CORE_VALUES = [
  {
    title: 'Truth',
    description: 'Operating with transparency, integrity, and accountability in all activities.',
  },
  {
    title: 'Right Conduct',
    description: 'Maintaining ethical leadership and responsible stewardship of community resources.',
  },
  {
    title: 'Peace',
    description: 'Fostering harmony, understanding, and unity across diverse cultural demographics.',
  },
  {
    title: 'Love',
    description: 'Serving every individual with compassion, dignity, respect, and empathy.',
  },
  {
    title: 'Non-Violence',
    description: 'Cultivating a safe, supportive, and inclusive environment for all.',
  },
];

export default function AboutUs() {
  return (
    <section className="bg-lasa-50 pb-14 sm:pb-20">
      <div className="border-b border-lasa-200 bg-gradient-to-b from-lasa-100 to-lasa-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lasa-500">
            About LASA Foundation Inc.
          </p>
          <h1 className="mt-3 text-3xl font-display text-lasa-700 sm:text-5xl">Our Mission</h1>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-lasa-600 sm:text-base">
            LASA Foundation Inc. is a non-denominational, entirely volunteer-led charitable
            organization headquartered in Lowell, Massachusetts. We are dedicated to delivering
            impactful humanitarian service and essential resources to underserved, low-income, and
            vulnerable populations.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="rounded-3xl border border-lasa-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-lasa-700">Love All, Serve All</h2>
          <p className="mt-3 text-sm leading-relaxed text-lasa-600 sm:text-base">
            Our foundation operates on the acronym LASA, which stands for "Love All, Serve All."
            This principle reflects the core philosophical message of Sri Sathya Sai Baba, guiding
            our global outlook on community welfare and unconditional service.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-lasa-700 sm:text-3xl">Our Core Values</h2>
          <p className="mt-2 text-sm text-lasa-500 sm:text-base">
            Our initiatives, programs, and community partnerships are anchored in five universal
            human values.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {CORE_VALUES.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-lasa-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lasa-400">Value</p>
                <h3 className="mt-2 text-base font-semibold text-lasa-700">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-lasa-600">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
