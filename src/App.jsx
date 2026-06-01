import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurActivities from './pages/OurActivities';
import FoodAndNourishment from './pages/FoodAndNourishment';
import HealthAndWellness from './pages/HealthAndWellness';
import MedicalClinic from './pages/MedicalClinic';
import Events from './pages/Events';
import ArchivedEvents from './pages/ArchivedEvents';
import EventDetails from './pages/EventDetails';
import ContactUs from './pages/ContactUs';
import Volunteer from './pages/Volunteer';
import AdminLogin from './pages/AdminLogin';
import AdminEvents from './pages/AdminEvents';
import AdminEventForm from './pages/AdminEventForm';
import RequireAuth from './components/admin/RequireAuth';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-activities" element={<OurActivities />} />
          <Route path="/our-activities/food-and-nourishment" element={<FoodAndNourishment />} />
          <Route path="/our-activities/health-and-wellness" element={<HealthAndWellness />} />
          <Route path="/our-activities/medical-clinic" element={<MedicalClinic />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/archived-events" element={<ArchivedEvents />} />
          <Route path="/events/upcoming" element={<Navigate to="/events" replace />} />
          <Route path="/events/past" element={<Navigate to="/archived-events" replace />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/donate" element={<Navigate to="/volunteer" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/events"
            element={
              <RequireAuth>
                <AdminEvents />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/events/new"
            element={
              <RequireAuth>
                <AdminEventForm />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/events/:eventId/edit"
            element={
              <RequireAuth>
                <AdminEventForm />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
