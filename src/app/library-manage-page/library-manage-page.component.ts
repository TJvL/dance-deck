import { Component } from '@angular/core';
import { LibraryImportFolderComponent } from '../library-import-folder/library-import-folder.component';
import { LibraryPathConfiguratorComponent } from '../library-path-configurator/library-path-configurator.component';
import { LibraryImportResultsComponent } from '../library-import-results/library-import-results.component';

@Component({
  selector: 'app-library-manage-page',
  imports: [
    LibraryPathConfiguratorComponent,
    LibraryImportFolderComponent,
    LibraryImportResultsComponent,
  ],
  templateUrl: './library-manage-page.component.html',
  styleUrl: './library-manage-page.component.css',
})
export class LibraryManagePageComponent {}
