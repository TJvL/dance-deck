import { Routes } from '@angular/router';

import { CategoryManagePageComponent } from './category-manage-page/category-manage-page.component';
import { DanceManagePageComponent } from './dance-manage-page/dance-manage-page.component';
import { LibraryManagePageComponent } from './library-manage-page/library-manage-page.component';
import { PlaybackPageComponent } from './playback-page/playback-page.component';

export const routes: Routes = [
  { path: 'playback-page', component: PlaybackPageComponent },
  { path: 'library-manage-page', component: LibraryManagePageComponent },
  { path: 'dance-manage-page', component: DanceManagePageComponent },
  { path: 'category-manage-page', component: CategoryManagePageComponent },
  {
    path: '',
    redirectTo: '/playback-page',
    pathMatch: 'full',
  },
];
