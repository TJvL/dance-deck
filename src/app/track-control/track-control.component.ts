import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-track-control',
  imports: [FontAwesomeModule],
  templateUrl: './track-control.component.html',
  styleUrl: './track-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackControlComponent {
  readonly playIcon = faPlay;
  readonly pauseIcon = faPause;
  readonly stepBackwardIcon = faStepBackward;
  readonly stepForwardIcon = faStepForward;

  readonly playing = signal(false);
  readonly trackProgress = signal(0);

  togglePlayPause(): void {
    this.playing.update((value) => !value);
  }
}
