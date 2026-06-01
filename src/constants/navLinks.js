export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  {
    label: 'Our Activities',
    path: '/our-activities',
    children: [
      { label: 'HealthCare', path: '/our-activities/food-and-nourishment' },
      { label: 'SocioCare', path: '/our-activities/health-and-wellness' },
      { label: 'EduCare', path: '/our-activities/medical-clinic' },
    ],
  },
  {
    label: 'Events',
    path: '/events',
  },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Volunteer', path: '/volunteer' },
];
