import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-library-import-folder',
  imports: [FaIconComponent],
  templateUrl: './library-import-folder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryImportFolderComponent {
  readonly folderOpenIcon = faFolderOpen;
}
