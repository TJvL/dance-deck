import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LibraryImportFolderComponent } from '../library-import-folder/library-import-folder.component';
import { LibraryPathConfiguratorComponent } from '../library-path-configurator/library-path-configurator.component';
import { LibraryImportResultsComponent } from '../library-import-results/library-import-results.component';

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
  private readonly router = inject(Router);
  private readonly faIconLibrary = inject(FaIconLibrary);

  constructor() {
    this.faIconLibrary.addIcons(faArrowLeft);
  }

  async backToPlayback() {
    await this.router.navigate(['playback-page']);
  }
}
