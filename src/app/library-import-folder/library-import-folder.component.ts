import { Component, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-library-import-folder',
  imports: [FaIconComponent],
  templateUrl: './library-import-folder.component.html',
  styleUrl: './library-import-folder.component.css',
})
export class LibraryImportFolderComponent {
  private readonly faIconLibrary = inject(FaIconLibrary);

  constructor() {
    this.faIconLibrary.addIcons(faFolderOpen);
  }
}
