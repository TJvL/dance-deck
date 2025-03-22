import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'track-playback-page',
    loadComponent: () =>
      import('./track-playback-page/track-playback-page.component').then((module) => module.TrackPlaybackPageComponent),
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
    path: 'application-settings-page',
    loadComponent: () =>
      import('./application-settings-page/application-settings-page.component').then(
        (module) => module.ApplicationSettingsPageComponent
      ),
  },
  {
    path: '',
    redirectTo: '/track-playback-page',
    pathMatch: 'full',
  },
];
