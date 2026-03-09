import { Routes } from '@angular/router';
import { Layout } from './shared/layout/layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'requests',
        loadComponent: () =>
          import('./features/requests/requests').then((m) => m.Requests),
      },
      {
        path: 'faqs',
        loadComponent: () =>
          import('./features/faqs/faqs').then((m) => m.Faqs),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
