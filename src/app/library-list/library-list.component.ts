import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';

import { TrackDto } from '../../data-transfer-objects';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrl: './library-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryListComponent {
  readonly tracks: WritableSignal<readonly TrackDto[]> = signal([]);
}
