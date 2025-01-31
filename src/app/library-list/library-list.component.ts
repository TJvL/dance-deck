import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import TrackModel from '../models/track.model';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-library-list',
  providers: [TrackService],
  templateUrl: './library-list.component.html',
  styleUrl: './library-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryListComponent implements OnInit {
  tracks: WritableSignal<readonly TrackModel[]> = signal([]);

  private readonly trackService = inject(TrackService);

  ngOnInit(): void {
    this.trackService.get_tracks().then((tracks) => this.tracks.set(tracks));
  }
}
