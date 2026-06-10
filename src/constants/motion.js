export const MOTION_PERSONALITY = 'cinematic';

const REVEAL_PERSONALITIES = {
  cinematic: {
    distance: 44,
    duration: 940,
    stagger: 130,
    threshold: 0.28,
    rootMargin: '0px 0px -22% 0px',
    replay: true,
    blur: 7,
    scaleFrom: 0.965,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  energetic: {
    distance: 22,
    duration: 560,
    stagger: 80,
    threshold: 0.24,
    rootMargin: '0px 0px -18% 0px',
    replay: true,
    blur: 4,
    scaleFrom: 0.985,
    easing: 'cubic-bezier(0.2, 0.75, 0.18, 1)',
  },
};

export const REVEAL_MOTION = REVEAL_PERSONALITIES[MOTION_PERSONALITY];

export function revealDelay(index, { base = 0, step = REVEAL_MOTION.stagger } = {}) {
  return base + index * step;
}