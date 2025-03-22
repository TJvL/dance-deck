import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

import { LibraryStore } from '../library.store';

@Component({
  selector: 'app-library-path-configurator',
  imports: [FaIconComponent],
  templateUrl: './library-path-configurator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPathConfiguratorComponent {
  readonly folderIcon = faFolder;

  readonly libraryStore = inject(LibraryStore);

  async setLibraryRoot() {
    await this.libraryStore.chooseLibraryRoot();
  }
}
