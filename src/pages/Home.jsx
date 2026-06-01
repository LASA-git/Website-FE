
import { Link } from 'react-router-dom';
import UpcomingEventsGallery from '../components/UpcomingEventsGallery';
import RecentEventsSection from '../components/RecentEventsSection';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex items-start pt-6 md:pt-10 lg:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lasa-400">
                Love All · Serve All
              </p>
              <h1 className="mt-4 text-2xl font-display text-lasa-700 leading-tight sm:text-4xl lg:text-6xl">
                Welcome to LASA Foundation
              </h1>
              <p className="mt-5 text-sm text-lasa-600/90 leading-relaxed max-w-2xl mx-auto sm:text-base lg:text-lg lg:mx-0">
                We are a charitable organization dedicated to undertaking community
                service activities based on Five Universal Human Values – Truth,
                Non-violence, Peace, Love, and Right Conduct. The acronym LASA
                stands for "Love All, Serve All". We are a free, non-denominational,
                and voluntary organization. Our members come from all walks of life
                and share a common goal – to empower the community around us through
                the practice of Love and Service.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 rounded-full bg-lasa-600 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-lasa-700"
                >
                  Explore events
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-lasa-200 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-lasa-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-lasa-100"
                >
                  Get involved
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center rounded-3xl border border-lasa-200 bg-white/90 p-8 shadow-xl">
              <img
                src="/logo-hires.png"
                alt="LASA Foundation Logo"
                className="w-32 sm:w-40 lg:w-56 h-auto"
              />

              <h2 className="mt-5 text-base sm:text-lg lg:text-xl font-semibold text-lasa-700 tracking-[0.25em] text-center">
                LOVE ALL SERVE ALL
              </h2>

              <p className="mt-2 text-xs sm:text-sm font-medium text-lasa-500 tracking-[0.3em] text-center uppercase">
                LASA Foundation Inc.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold uppercase text-lasa-500">
                <span className="rounded-full border border-lasa-200 bg-lasa-50 px-3 py-1">Truth</span>
                <span className="rounded-full border border-lasa-200 bg-lasa-50 px-3 py-1">Peace</span>
                <span className="rounded-full border border-lasa-200 bg-lasa-50 px-3 py-1">Love</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Gallery */}
      <UpcomingEventsGallery />

      {/* Recent Events */}
      <RecentEventsSection />
    </>
  );
}
