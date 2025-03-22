import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-library-path-configurator',
  imports: [FaIconComponent],
  templateUrl: './library-path-configurator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPathConfiguratorComponent {
  readonly folderIcon = faFolder;
}
