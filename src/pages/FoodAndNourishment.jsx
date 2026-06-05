const SOCIOCARE_PROGRAMS = [
  {
    title: 'Nutritional Security and Food Pantry Services',
    description:
      'We run robust food security projects designed to alleviate hunger and malnutrition. By distributing fresh groceries and hot meals to low-income families and individuals, we ensure that the most fundamental human need for nourishment is met with dignity and care.',
  },
  {
    title: 'Humanitarian Resettlement and Integration',
    description:
      'In partnership with local agencies, we provide essential support to newly arrived refugees and displaced populations, such as families from Afghanistan. Our services extend beyond initial shelter to include furniture distribution, transportation assistance, and long-term community integration.',
  },
  {
    title: 'Shelter and Crisis Outreach',
    description:
      'We actively partner with and support local shelters, providing necessary life supplies, seasonal clothing, and immediate resources to individuals experiencing homelessness or housing instability.',
  },
  {
    title: 'Environmental and Community Bonding',
    description:
      'Sociocare recognizes that a healthy community requires a harmonious environment. We foster civic pride and community unity through localized volunteer service projects, encouraging individuals from all backgrounds to work together for the collective good.',
  },
];

export default function FoodAndNourishment() {
  return (
    <section className="bg-lasa-50 pb-14 sm:pb-20">
      <div className="border-b border-lasa-200 bg-gradient-to-b from-lasa-100 to-lasa-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lasa-500">
            Sociocare: Community Welfare and Social Upliftment
          </p>
          <h1 className="mt-3 text-3xl font-display text-lasa-700 sm:text-5xl">
            Strengthening the social fabric
          </h1>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-lasa-600 sm:text-base">
            Sociocare represents the practical expression of our motto, "Love All, Serve All," at
            the societal level. It is our comprehensive commitment to improving the social fabric,
            environmental well-being, and overall quality of life for the larger community.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="rounded-3xl border border-lasa-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm leading-relaxed text-lasa-600 sm:text-base">
            While our medical and educational programs heal the body and empower the mind, our
            Sociocare initiatives focus on restoring dignity, ensuring food security, and creating a
            supportive ecosystem for vulnerable populations.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-lasa-600 sm:text-base">
            Our Sociocare framework addresses systemic social challenges through dedicated,
            volunteer-driven programs:
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {SOCIOCARE_PROGRAMS.map((program) => (
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
          Through Sociocare, LASA Foundation Inc. treats society as one extended family, ensuring
          that no individual is left behind and that every community member feels valued, protected,
          and supported.
        </p>
      </div>
    </section>
  );
}
