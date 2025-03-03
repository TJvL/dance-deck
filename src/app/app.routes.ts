import { Routes } from '@angular/router';
import { PlaybackPageComponent } from './playback-page/playback-page.component';
import { LibraryManagePageComponent } from './library-manage-page/library-manage-page.component';

export const routes: Routes = [
  { path: 'playback-page', component: PlaybackPageComponent },
  { path: 'library-manage-page', component: LibraryManagePageComponent },
  {
    path: '',
    redirectTo: '/playback-page',
    pathMatch: 'full',
  },
];
