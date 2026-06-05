const HEALTHCARE_PILLARS = [
  {
    title: 'Barrier-Free Medical Clinics',
    description:
      'We host comprehensive, biannual free medical clinics staffed entirely by licensed healthcare professionals who volunteer their time and expertise. These clinics offer specialized consultations in cardiology, oncology, and neurology, alongside routine physicals and screenings, ensuring that financial hardship never dictates health outcomes.',
  },
  {
    title: 'Public Health and Immunization',
    description:
      'In partnership with public health authorities, our facilities serve as trusted community clinics. By facilitating thousands of critical vaccinations and preventative screenings, we actively protect public health and build long-term community resilience.',
  },
  {
    title: 'Compassionate Patient Support',
    description:
      'True healthcare extends beyond the exam room. Our Caregiver Support Program provides vital grocery supplies and resources to the immediate families of cancer patients, alleviating the peripheral burdens of illness so families can focus entirely on healing.',
  },
];

export default function HealthAndWellness() {
  return (
    <section className="bg-lasa-50 pb-14 sm:pb-20">
      <div className="border-b border-lasa-200 bg-gradient-to-b from-lasa-100 to-lasa-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lasa-500">
            Holistic Healthcare as a Service
          </p>
          <h1 className="mt-3 text-3xl font-display text-lasa-700 sm:text-5xl">
            Healthcare that honors dignity and access
          </h1>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-lasa-600 sm:text-base">
            At LASA Foundation Inc., we view healthcare not merely as a medical necessity, but as a
            vital, compassionate community service. Operating under our core mandate to "Love All,
            Serve All," our healthcare initiatives bridge critical gaps for low-income, uninsured,
            and vulnerable individuals who face systemic barriers to quality medical care.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="rounded-3xl border border-lasa-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm leading-relaxed text-lasa-600 sm:text-base">
            Our service-driven healthcare model focuses on dignity, accessibility, and preventive
            wellness through three major pillars:
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {HEALTHCARE_PILLARS.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-lasa-200 bg-lasa-50 p-5 transition-all hover:-translate-y-0.5"
              >
                <h2 className="text-base font-semibold text-lasa-700">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-lasa-600">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-lasa-600 sm:text-base">
          Through these volunteer-driven services, we translate our five universal values into
          tangible, life-saving care, ensuring every patient is treated as an individual worthy of
          compassion and respect.
        </p>
      </div>
    </section>
  );
}
