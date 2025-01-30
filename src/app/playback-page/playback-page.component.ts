import { Component } from '@angular/core';
import { TrackControlComponent } from '../track-control/track-control.component';

@Component({
  selector: 'app-playback-page',
  imports: [TrackControlComponent],
  templateUrl: './playback-page.component.html',
  styleUrl: './playback-page.component.css',
})
export class PlaybackPageComponent {}
