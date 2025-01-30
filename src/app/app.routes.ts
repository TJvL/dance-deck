import { Routes } from '@angular/router';
import { PlaybackPageComponent } from './playback-page/playback-page.component';

export const routes: Routes = [
  { path: 'playback-page', component: PlaybackPageComponent },
  {
    path: '',
    redirectTo: '/playback-page',
    pathMatch: 'full',
  },
];
