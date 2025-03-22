import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PopUpMenuComponent } from './pop-up-menu/pop-up-menu.component';
import { TrackControlComponent } from './track-control/track-control.component';
import { LibraryListComponent } from './track-list/library-list.component';
import { TrackSearchComponent } from './track-search/track-search.component';

@Component({
  selector: 'app-track-playback-page',
  imports: [
    TrackControlComponent,
    TrackSearchComponent,
    TrackSearchComponent,
    LibraryListComponent,
    PopUpMenuComponent,
  ],
  templateUrl: './track-playback-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackPlaybackPageComponent {}
