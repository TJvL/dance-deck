import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-to-track-playback-button',
  templateUrl: './back-to-track-playback-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FaIconComponent],
})
export class BackToTrackPlaybackButtonComponent {
  private readonly router = inject(Router);

  async backToPlayback() {
    await this.router.navigate(['track-playback-page']);
  }

  protected readonly arrowLeftIcon = faArrowLeft;
}
