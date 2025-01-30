import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-track-control',
  imports: [FontAwesomeModule],
  templateUrl: './track-control.component.html',
  styleUrl: './track-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackControlComponent {
  public playing = signal(false);
  public trackProgress = signal(0);

  private readonly falconLibrary = inject(FaIconLibrary);

  constructor() {
    this.falconLibrary.addIcons(faPlay, faPause, faStepBackward, faStepForward);
  }

  togglePlayPause(): void {
    this.playing.update((value) => !value);
  }
}
