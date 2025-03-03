import { Component, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-library-path-configurator',
  imports: [FaIconComponent],
  templateUrl: './library-path-configurator.component.html',
  styleUrl: './library-path-configurator.component.css',
})
export class LibraryPathConfiguratorComponent {
  private readonly faIconLibrary = inject(FaIconLibrary);

  constructor() {
    this.faIconLibrary.addIcons(faFolder);
  }
}
