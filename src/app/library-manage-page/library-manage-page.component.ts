import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BackToTrackPlaybackButtonComponent } from '../back-to-track-playback-button/back-to-track-playback-button.component';

import { LibraryImportFolderComponent } from './library-import-folder/library-import-folder.component';
import { LibraryImportResultsComponent } from './library-import-results/library-import-results.component';
import { LibraryPathConfiguratorComponent } from './library-path-configurator/library-path-configurator.component';

@Component({
  selector: 'app-library-manage-page',
  imports: [
    LibraryPathConfiguratorComponent,
    LibraryImportFolderComponent,
    LibraryImportResultsComponent,
    BackToTrackPlaybackButtonComponent,
  ],
  templateUrl: './library-manage-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryManagePageComponent {}
