import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function RouteScrollToTop() {
  const { pathname, search } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'POP') {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname, search, navigationType]);

  return null;
}