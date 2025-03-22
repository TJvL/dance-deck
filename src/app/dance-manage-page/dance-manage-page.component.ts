import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BackToTrackPlaybackButtonComponent } from '../back-to-track-playback-button/back-to-track-playback-button.component';

import { DanceListComponent } from './dance-list/dance-list.component';

@Component({
  selector: 'app-dance-manage-page',
  imports: [ReactiveFormsModule, DanceListComponent, BackToTrackPlaybackButtonComponent],
  templateUrl: './dance-manage-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DanceManagePageComponent {}
