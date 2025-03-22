import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'playback-page',
    loadComponent: () =>
      import('./playback-page/playback-page.component').then((module) => module.PlaybackPageComponent),
  },
  {
    path: 'library-manage-page',
    loadComponent: () =>
      import('./library-manage-page/library-manage-page.component').then((module) => module.LibraryManagePageComponent),
  },
  {
    path: 'dance-manage-page',
    loadComponent: () =>
      import('./dance-manage-page/dance-manage-page.component').then((module) => module.DanceManagePageComponent),
  },
  {
    path: 'category-manage-page',
    loadComponent: () =>
      import('./category-manage-page/category-manage-page.component').then(
        (module) => module.CategoryManagePageComponent
      ),
  },
  {
    path: '',
    redirectTo: '/playback-page',
    pathMatch: 'full',
  },
];
