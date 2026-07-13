import { useEffect, useState } from 'react';
import { fetchActivityGalleries } from '../../api/activityGalleries';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';
import ActivityGallery from './ActivityGallery';

const SECTION_COPY = {
  healthcare: {
    title: 'Healthcare Gallery',
    description: 'Images from clinics, outreach, and wellness support.',
  },
  sociocare: {
    title: 'Sociocare Gallery',
    description: 'Images from food relief, social support, and community care.',
  },
  educare: {
    title: 'Educare Gallery',
    description: 'Images from learning, mentoring, and family empowerment.',
  },
};

export default function ActivityGallerySection({ section }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadGalleries() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchActivityGalleries();
        if (isMounted) {
          setContent(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'Unable to load gallery');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadGalleries();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingState message="Loading gallery..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  const meta = SECTION_COPY[section] || SECTION_COPY.healthcare;

  return (
    <ActivityGallery
      title={meta.title}
      description={meta.description}
      items={content?.[section] || []}
      className="mt-10"
    />
  );
}
