import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { CategoriesStore } from '../../category-manage-page/category.store';
import { DancesStore } from '../dance.store';

@Component({
  selector: 'app-dance-list',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './dance-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DanceListComponent {
  readonly trashIcon = faTrash;
  readonly plusIcon = faPlus;

  readonly categoriesStore = inject(CategoriesStore);
  readonly dancesStore = inject(DancesStore);
}
