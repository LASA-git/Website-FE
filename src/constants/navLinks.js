export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  {
    label: 'Our Activities',
    path: '/our-activities',
    children: [
      { label: 'HealthCare', path: '/our-activities/healthcare' },
      { label: 'SocioCare', path: '/our-activities/sociocare' },
      { label: 'EduCare', path: '/our-activities/educare' },
    ],
  },
  {
    label: 'Events',
    path: '/events',
  },
  { label: 'Volunteer', path: '/volunteer' },
  { label: 'Contact Us', path: '/contact' },
];
