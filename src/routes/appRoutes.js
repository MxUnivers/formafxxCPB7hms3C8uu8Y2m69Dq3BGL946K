// routes/appRoutes.js

import Index from '../pages/Index';
import Formations from '../pages/Formations';
import FormationDetail from '../pages/FormationDetail';
import FormationEnrollment from '../pages/FormationEnrollment';
import BookingCalendar from '../pages/BookingCalendar';
import Payment from '../pages/Payment';
import Calendar from '../pages/Calendar';
import Register from '../pages/Register';
import StudentDashboard from '../pages/StudentDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import CreateFormation from '../pages/CreateFormation';
import Login from '../pages/Login';         // ✅ Importe Login

export const appRoutes = [
  // [0] Public Routes - Accueil
  {
    path: '/',
    component: Index,
    title: 'Accueil',
    isPublic: true,
  },
  // [1] Public Routes - Liste des formations
  {
    path: '/formations',
    component: Formations,
    title: 'Formations',
    isPublic: true,
  },
  // [2] Public Routes - Détail d'une formation
  {
    path: '/formations/:id',
    component: FormationDetail,
    title: 'Détail de la formation',
    isPublic: true,
  },
  // [3] Private Route - S'inscrire à une formation
  {
    path: '/formations/:id/enroll',
    component: FormationEnrollment,
    title: 'S\'inscrire à la formation',
    isPublic: false,
  },
  // [4] Private Route - Réserver une session
  {
    path: '/formations/:id/book',
    component: BookingCalendar,
    title: 'Réserver une session',
    isPublic: false,
  },
  // [5] Private Route - Paiement pour une formation
  {
    path: '/formations/:id/payment',
    component: Payment,
    title: 'Paiement',
    isPublic: false,
  },
  // [6] Public Route - Calendrier des sessions
  {
    path: '/calendar',
    component: Calendar,
    title: 'Calendrier des sessions',
    isPublic: true,
  },

  // [7] Auth Route - Connexion
  {
    path: '/login',
    component: Login,
    title: 'Connexion',
    isPublic: true,
    layout: 'auth',
  },
  // [8] Auth Route - Inscription
  {
    path: '/register',
    component: Register,
    title: 'Inscription',
    isPublic: true,
    layout: 'auth',
  },

  // [9] Student Route - Dashboard étudiant
  {
    path: '/student',
    component: StudentDashboard,
    title: 'Tableau de bord Étudiant',
    isPublic: false,
    role: ['Student'],
  },

  // [10] Admin Route - Dashboard admin
  {
    path: '/admin',
    component: AdminDashboard,
    title: 'Tableau de bord Admin',
    isPublic: false,
    role: ['Admin', 'SuperAdmin'],
  },
  // [11] Admin Route - Créer une formation
  {
    path: '/admin/formations/create',
    component: CreateFormation,
    title: 'Créer une formation',
    isPublic: false,
    role: ['Admin', 'SuperAdmin'],
  },

  // [12] Private Route - Page de paiement globale
  {
    path: '/payment',
    component: Payment,
    title: 'Paiement',
    isPublic: false,
  },
];

export default appRoutes;