export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  {
    label: 'Our Activities',
    path: '/our-activities',
    children: [
      { label: 'HealthCare', path: '/our-activities/health-and-wellness' },
      { label: 'SocioCare', path: '/our-activities/food-and-nourishment' },
      { label: 'EduCare', path: '/our-activities/medical-clinic' },
    ],
  },
  {
    label: 'Events',
    path: '/events',
  },
  { label: 'Volunteer', path: '/volunteer' },
  { label: 'Contact Us', path: '/contact' },
];
