import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-library-search',
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrarySearchComponent {}
