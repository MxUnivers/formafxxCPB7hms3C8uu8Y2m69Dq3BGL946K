// routes/appRoutes.js

import Index from '../pages/Index';
import Formations from '../pages/Formations';
import FormationDetail from '../pages/FormationDetail';
import FormationEnrollment from '../pages/FormationEnrollment';
import BookingCalendar from '../pages/BookingCalendar';
import Payment from '../pages/Payment';
import CreateFormation from '../pages/admin/CreateFormation';
import Calendar from '../pages/Calendar';
import StudentDashboard from '../pages/student/StudentDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const appRoutes = [
  // Public Routes
  {
    path: '/',
    element: <Index />,
    title: 'Accueil',
    isPublic: true,
  },
  {
    path: '/formations',
    element: <Formations />,
    title: 'Formations',
    isPublic: true,
  },
  {
    path: '/formations/:id',
    element: <FormationDetail />,
    title: 'Détail de la formation',
    isPublic: true,
  },
  {
    path: '/formations/:id/enroll',
    element: <FormationEnrollment />,
    title: 'S\'inscrire à la formation',
    isPublic: false,
  },
  {
    path: '/formations/:id/book',
    element: <BookingCalendar />,
    title: 'Réserver une session',
    isPublic: false,
  },
  {
    path: '/formations/:id/payment',
    element: <Payment />,
    title: 'Paiement',
    isPublic: false,
  },
  {
    path: '/calendar',
    element: <Calendar />,
    title: 'Calendrier des sessions',
    isPublic: true,
  },

  // Auth Routes
  {
    path: '/login',
    element: <Login />,
    title: 'Connexion',
    isPublic: true,
    layout: 'auth', // Optionnel : pour utiliser un layout spécial
  },
  {
    path: '/register',
    element: <Register />,
    title: 'Inscription',
    isPublic: true,
    layout: 'auth',
  },

  // Student Routes
  {
    path: '/student',
    element: <StudentDashboard />,
    title: 'Tableau de bord Étudiant',
    isPublic: false,
    role: ['Student'],
  },

  // Admin Routes
  {
    path: '/admin',
    element: <AdminDashboard />,
    title: 'Tableau de bord Admin',
    isPublic: false,
    role: ['Admin', 'SuperAdmin'],
  },
  {
    path: '/admin/formations/create',
    element: <CreateFormation />,
    title: 'Créer une formation',
    isPublic: false,
    role: ['Admin', 'SuperAdmin'],
  },

  // Autres
  {
    path: '/payment',
    element: <Payment />,
    title: 'Paiement',
    isPublic: false,
  },
];

export default appRoutes;