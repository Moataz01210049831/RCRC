import { Routes } from '@angular/router';
import { Layout } from './shared/layout/layout';

export const routes: Routes = [
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
];
