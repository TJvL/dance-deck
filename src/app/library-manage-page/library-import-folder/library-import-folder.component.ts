import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { open } from '@tauri-apps/plugin-dialog';

import { ImportService } from '../import.service';
import { LibraryImportProgressComponent } from '../library-import-progress/library-import-progress.component';

@Component({
  selector: 'app-library-import-folder',
  imports: [FormsModule, FaIconComponent, LibraryImportProgressComponent],
  templateUrl: './library-import-folder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryImportFolderComponent {
  readonly folderOpenIcon = faFolderOpen;

  readonly directoryPath = signal<string | null>(null);

  filePattern = '{dance} - {artist} - {title}';
  readMetadata = true;

  readonly importService = inject(ImportService);

  async pickFolder() {
    const directory = await open({
      multiple: false,
      directory: true,
    });
    this.directoryPath.set(directory);
  }

  async startImportAndReset() {
    await this.importService.startImport();
    this.directoryPath.set(null);
    this.filePattern = '{dance} - {artist} - {title}';
    this.readMetadata = true;
  }
}
