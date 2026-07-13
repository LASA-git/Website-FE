import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchRecentEventsSection } from '../../api/recentEvents';
import ActivityGallery from '../activity/ActivityGallery';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';

export default function AboutImageGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGallery = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const section = await fetchRecentEventsSection();
      setItems(section?.carouselItems || []);
    } catch (err) {
      setError(err?.message || 'Unable to load community highlights');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const galleryItems = useMemo(
    () => (items || []).map((item) => ({
      imageUrl: item.imageUrl,
      caption: item.altText || '',
      altText: item.altText || '',
    })),
    [items]
  );

  if (loading) {
    return <LoadingState message="Loading community highlights..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadGallery} />;
  }

  return (
    <ActivityGallery
      title="Community Highlights"
      description="A closer look at the service events, outreach moments, and stories that shape our work."
      items={galleryItems}
    />
  );
}
