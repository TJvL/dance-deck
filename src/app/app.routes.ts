import { Routes } from '@angular/router';

import { DanceManagePageComponent } from './dance-manage-page/dance-manage-page.component';
import { LibraryManagePageComponent } from './library-manage-page/library-manage-page.component';
import { PlaybackPageComponent } from './playback-page/playback-page.component';

export const routes: Routes = [
  { path: 'playback-page', component: PlaybackPageComponent },
  { path: 'library-manage-page', component: LibraryManagePageComponent },
  { path: 'dance-manage-page', component: DanceManagePageComponent },
  {
    path: '',
    redirectTo: '/playback-page',
    pathMatch: 'full',
  },
];
