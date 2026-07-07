import RecentEventsGallery from './RecentEventsGallery';

export default function RecentEventsSection() {
  return (
    <section className="w-full pt-4 pb-12 sm:pt-6 sm:pb-16 md:pt-8 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-display text-lasa-700 sm:text-3xl md:text-4xl">
            Recent Events
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-lasa-600/80 sm:text-base md:text-lg">
            A short overview of our recent community service and outreach work.
          </p>
        </div>

        <div className="rounded-3xl border border-lasa-200 bg-white/80 p-4 shadow-sm sm:p-6 md:p-8">
          <RecentEventsGallery
            title=""
            description=""
            showHeader={false}
            showCarousel={false}
            className=""
          />
        </div>
      </div>
    </section>
  );
}
