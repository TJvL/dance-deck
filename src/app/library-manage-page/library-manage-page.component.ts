import { Component } from '@angular/core';
import { LibraryListComponent } from '../library-list/library-list.component';
import { LibrarySearchComponent } from '../library-search/library-search.component';
import { InformationExtractionConfiguratorComponent } from '../information-extraction-configurator/information-extraction-configurator.component';
import { LibraryPathConfiguratorComponent } from '../library-path-configurator/library-path-configurator.component';

@Component({
  selector: 'app-library-manage-page',
  imports: [
    LibrarySearchComponent,
    LibraryListComponent,
    LibraryPathConfiguratorComponent,
    InformationExtractionConfiguratorComponent,
  ],
  templateUrl: './library-manage-page.component.html',
  styleUrl: './library-manage-page.component.css',
})
export class LibraryManagePageComponent {}
