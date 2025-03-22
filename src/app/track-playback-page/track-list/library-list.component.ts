import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';

import { TrackDto } from '../../../data-transfer-objects';

@Component({
  selector: 'app-track-list',
  templateUrl: './library-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryListComponent {
  readonly tracks: WritableSignal<readonly TrackDto[]> = signal([]);
}
