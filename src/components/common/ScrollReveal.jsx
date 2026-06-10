import { useEffect, useMemo, useRef, useState } from 'react';
import { REVEAL_MOTION } from '../../constants/motion';

const DIRECTION_AXIS = {
  up: [0, 1],
  down: [0, -1],
  left: [1, 0],
  right: [-1, 0],
};

export default function ScrollReveal({
  as: Tag = 'div',
  children,
  className = '',
  direction = 'up',
  distance = REVEAL_MOTION.distance,
  delay = 0,
  duration = REVEAL_MOTION.duration,
  threshold = REVEAL_MOTION.threshold,
  rootMargin = REVEAL_MOTION.rootMargin,
  blur = REVEAL_MOTION.blur,
  scaleFrom = REVEAL_MOTION.scaleFrom,
  easing = REVEAL_MOTION.easing,
  once = !REVEAL_MOTION.replay,
  style,
  ...rest
}) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return reducedMotion || typeof IntersectionObserver === 'undefined';
  });
  const elementRef = useRef(null);

  const hiddenTransform = useMemo(() => {
    const [xAxis, yAxis] = DIRECTION_AXIS[direction] || DIRECTION_AXIS.up;
    return `translate3d(${xAxis * distance}px, ${yAxis * distance}px, 0) scale(${scaleFrom})`;
  }, [direction, distance, scaleFrom]);

  useEffect(() => {
    const node = elementRef.current;

    if (!node || (isVisible && once)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [isVisible, once, rootMargin, threshold]);

  return (
    <Tag
      ref={elementRef}
      className={`reveal-item ${className}`.trim()}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : hiddenTransform,
        filter: isVisible ? 'blur(0px)' : `blur(${blur}px)`,
        '--reveal-easing': easing,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}