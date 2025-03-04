import { Component, signal } from '@angular/core';
import ImportedTrackModel from '../models/imported-track.model';

@Component({
  selector: 'app-library-import-results',
  imports: [],
  templateUrl: './library-import-results.component.html',
  styleUrl: './library-import-results.component.css',
})
export class LibraryImportResultsComponent {
  importResults = signal<ImportedTrackModel[]>([]);
}
