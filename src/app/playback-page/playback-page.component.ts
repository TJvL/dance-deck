import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TrackControlComponent } from '../track-control/track-control.component';
import { LibrarySearchComponent } from '../library-search/library-search.component';
import { LibraryListComponent } from '../library-list/library-list.component';
import { PopUpMenuComponent } from '../pop-up-menu/pop-up-menu.component';

@Component({
  selector: 'app-playback-page',
  imports: [
    TrackControlComponent,
    LibrarySearchComponent,
    LibrarySearchComponent,
    LibraryListComponent,
    PopUpMenuComponent,
  ],
  templateUrl: './playback-page.component.html',
  styleUrl: './playback-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaybackPageComponent {}
