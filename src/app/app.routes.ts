import { Routes } from '@angular/router';
import { Layout } from './shared/layout/layout';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
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
      {
        path: 'create-request',
        loadComponent: () =>
          import('./features/create-request/create-request').then((m) => m.CreateRequest),
      },
      {
        path: 'request-details/:id',
        loadComponent: () =>
          import('./features/request-details/request-details').then((m) => m.RequestDetails),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
