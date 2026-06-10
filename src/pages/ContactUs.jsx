import { CONTACT } from '../constants/contact';

export default function ContactUs() {
  return (
    <section className="bg-lasa-50 pb-14 sm:pb-20">
      <div className="border-b border-lasa-200 bg-gradient-to-b from-lasa-100 to-lasa-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lasa-500">
            Reach LASA Foundation Inc.
          </p>
          <h1 className="mt-3 text-3xl font-display text-lasa-700 sm:text-5xl">Contact Us</h1>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-lasa-600 sm:text-base">
            We are always happy to hear from volunteers, partners, and families looking for
            support. Reach out through phone, email, social media, or visit us in Lowell.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-6 px-4 sm:mt-14 sm:px-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-lasa-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-lasa-700">Quick Contacts</h2>
          <p className="mt-2 text-sm text-lasa-500 sm:text-base">
            Use these direct channels to connect with our team.
          </p>

          <ul className="mt-6 space-y-4 text-sm text-lasa-600 sm:text-base">
            <li className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-lasa-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>
                {CONTACT.addressLine1}
                <br />
                {CONTACT.addressLine2}
              </span>
            </li>

            <li className="flex items-center gap-3">
              <svg
                className="h-5 w-5 flex-shrink-0 text-lasa-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a href={CONTACT.phoneHref} className="font-medium hover:text-lasa-700 transition-colors">
                {CONTACT.phoneLabel}
              </a>
            </li>

            <li className="flex items-center gap-3">
              <svg
                className="h-5 w-5 flex-shrink-0 text-lasa-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a href={CONTACT.emailHref} className="font-medium hover:text-lasa-700 transition-colors">
                {CONTACT.emailLabel}
              </a>
            </li>

            <li className="flex items-center gap-3">
              <a
                href={CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-lasa-200 px-3 py-2 text-sm font-medium text-lasa-700 transition-colors hover:border-lasa-300 hover:bg-lasa-100"
                aria-label="Visit our Facebook profile"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1877F2] text-white">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.01 10.125 11.927v-8.437H7.078v-3.49h3.047V9.414c0-3.017 1.792-4.683 4.533-4.683 1.313 0 2.686.236 2.686.236v2.963h-1.514c-1.49 0-1.955.929-1.955 1.881v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.083 24 18.092 24 12.073z" />
                  </svg>
                </span>
                Follow us on Facebook
              </a>
            </li>
          </ul>
        </article>

        <article className="overflow-hidden rounded-3xl border border-lasa-200 bg-white shadow-sm">
          <div className="border-b border-lasa-200 px-6 py-5 sm:px-8">
            <h2 className="text-2xl font-semibold text-lasa-700">Find Us on Map</h2>
            <p className="mt-2 text-sm text-lasa-500 sm:text-base">
              Visit our Lowell location for community events and service activities.
            </p>
          </div>

          <div className="relative h-[360px] w-full sm:h-[420px]">
            <iframe
              title="LASA Foundation location"
              src={CONTACT.mapsEmbedUrl}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="px-6 py-5 sm:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={CONTACT.mapsAppleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-lasa-200 px-4 py-2 text-sm font-medium text-lasa-700 transition-colors hover:border-lasa-300 hover:bg-lasa-100"
              >
                Open in Apple Maps
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h5M5 5v14h14v-5" />
                </svg>
              </a>

            <a
              href={CONTACT.mapsOpenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-lasa-200 px-4 py-2 text-sm font-medium text-lasa-700 transition-colors hover:border-lasa-300 hover:bg-lasa-100"
            >
              Open in Google Maps
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h5M5 5v14h14v-5" />
              </svg>
            </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
