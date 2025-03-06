import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-library-path-configurator',
  imports: [FaIconComponent],
  templateUrl: './library-path-configurator.component.html',
  styleUrl: './library-path-configurator.component.css',
})
export class LibraryPathConfiguratorComponent {
  readonly folderIcon = faFolder;
}
