import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-library-search',
  imports: [FontAwesomeModule],
  providers: [LibraryService],
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrarySearchComponent {
  private readonly faIconLibrary = inject(FaIconLibrary);
  private readonly libraryService = inject(LibraryService);

  constructor() {
    this.faIconLibrary.addIcons(faFolderOpen);
  }

  openDialog() {
    this.libraryService.openFolderSelectDialog();
  }
}
