import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ImportProgressDto } from '../library.dto';

@Component({
  selector: 'app-library-import-progress',
  templateUrl: './library-import-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryImportProgressComponent {
  readonly started = input<boolean>(false);
  readonly progress = input<ImportProgressDto>({
    percentage: 0,
    currentFileName: '',
  });
}
