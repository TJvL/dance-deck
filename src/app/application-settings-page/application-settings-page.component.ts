import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BackToTrackPlaybackButtonComponent } from '../back-to-track-playback-button/back-to-track-playback-button.component';

@Component({
  selector: 'app-application-settings-page',
  imports: [BackToTrackPlaybackButtonComponent],
  templateUrl: './application-settings-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationSettingsPageComponent {}
