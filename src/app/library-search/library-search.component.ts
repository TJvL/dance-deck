import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-library-search',
  providers: [LibraryService],
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrarySearchComponent {}
