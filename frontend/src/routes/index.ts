import { lazy } from 'react';

const Login = lazy(() => import('../pages/Authentication/SignIn'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const medications = lazy(() => import('../pages/medications'));
const AddMedicationForm = lazy(() => import('../pages/medicationsForm'));
const medicationsRefills = lazy(() => import('../pages/medicationsRefills'));
const medicationsRefillsRequest = lazy(() => import('../pages/medicationsRefillsRequest'));

const coreRoutes = [
  {
    path: '/',
    title: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/medications',
    title: 'Medications',
    component: medications,
  },
  {
    path: '/add-medication',
    title: 'Add Medication',
    component: AddMedicationForm,
  },
  {
    path: '/medications-refills',
    title: 'medications-refills',
    component: medicationsRefills,
  },
  {
    path: '/medications-refills-request',
    title: 'medications-refills-request',
    component: medicationsRefillsRequest,
  }
];

const routes = [...coreRoutes];
export default routes;
