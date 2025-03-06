import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { LibraryImportFolderComponent } from '../library-import-folder/library-import-folder.component';
import { LibraryImportResultsComponent } from '../library-import-results/library-import-results.component';
import { LibraryPathConfiguratorComponent } from '../library-path-configurator/library-path-configurator.component';

@Component({
  selector: 'app-library-manage-page',
  imports: [
    FaIconComponent,
    LibraryPathConfiguratorComponent,
    LibraryImportFolderComponent,
    LibraryImportResultsComponent,
  ],
  templateUrl: './library-manage-page.component.html',
  styleUrl: './library-manage-page.component.css',
})
export class LibraryManagePageComponent {
  readonly arrowLeftIcon = faArrowLeft;

  private readonly router = inject(Router);

  async backToPlayback() {
    await this.router.navigate(['playback-page']);
  }
}
