import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/dashboard'));
const medications = lazy(() => import('../pages/medications'));
const medicationsRefills = lazy(() => import('../pages/medicationsRefills'));
const medicationsRefillsRequest = lazy(() => import('../pages/medicationsRefillsRequest'));

const coreRoutes = [
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
