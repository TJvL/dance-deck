import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ImportedResultDto } from '../../../data-transfer-objects';

@Component({
  selector: 'app-library-import-results',
  imports: [FormsModule],
  templateUrl: './library-import-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryImportResultsComponent {
  readonly importResults = signal<ImportedResultDto[]>([
    {
      trackName: 'benny',
      artistName: 'renny',
      danceName: 'booby',
    },
    {
      trackName: 'stomp',
      artistName: 'bomb',
      danceName: 'volt',
    },
  ]);
}
