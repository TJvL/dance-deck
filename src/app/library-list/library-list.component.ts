import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';

import { TrackDto } from '../../data-transfer-objects';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-library-list',
  providers: [TrackService],
  templateUrl: './library-list.component.html',
  styleUrl: './library-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryListComponent implements OnInit {
  readonly tracks: WritableSignal<readonly TrackDto[]> = signal([]);

  private readonly trackService = inject(TrackService);

  ngOnInit(): void {
    this.trackService.get_tracks().then((tracks) => this.tracks.set(tracks));
  }
}
