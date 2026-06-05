const EDUCARE_PROGRAMS = [
  {
    title: 'Youth Tutoring and Academic Assistance',
    description:
      'Integrated directly into our community outreach, we provide supportive tutoring services for children. This initiative ensures that students from low-income or freshly resettled families receive the specialized academic attention needed to thrive in school.',
  },
  {
    title: 'Holistic Nutrition and Wellness Education',
    description:
      'True education extends to life skills. In tandem with our food pantry services, we host educational workshops focused on healthy eating, cooking, and nutritional literacy, teaching families how to maximize resources for long-term health.',
  },
];

export default function MedicalClinic() {
  return (
    <section className="bg-lasa-50 pb-14 sm:pb-20">
      <div className="border-b border-lasa-200 bg-gradient-to-b from-lasa-100 to-lasa-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lasa-500">
            Educare and Community Learning Services
          </p>
          <h1 className="mt-3 text-3xl font-display text-lasa-700 sm:text-5xl">
            Education that builds character and resilience
          </h1>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-lasa-600 sm:text-base">
            At LASA Foundation Inc., our approach to education goes beyond traditional academic
            instruction. We practice Educare, a service-driven educational philosophy that seeks to
            draw out the inherent human values of Truth, Right Conduct, Peace, Love, and
            Non-Violence from within each individual.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="rounded-3xl border border-lasa-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm leading-relaxed text-lasa-600 sm:text-base">
            We believe that true learning should foster character development, empower families,
            and build long-term community self-reliance.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-lasa-600 sm:text-base">
            Our Educare and community learning initiatives serve diverse age groups through
            targeted, high-impact service programs:
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {EDUCARE_PROGRAMS.map((program) => (
              <article
                key={program.title}
                className="rounded-2xl border border-lasa-200 bg-lasa-50 p-5 transition-all hover:-translate-y-0.5"
              >
                <h2 className="text-base font-semibold text-lasa-700">{program.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-lasa-600">{program.description}</p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-lasa-600 sm:text-base">
          Through these character-centric and practical educational services, we do not just
          teach, we empower individuals to transform their lives and uplift their communities.
        </p>
      </div>
    </section>
  );
}
