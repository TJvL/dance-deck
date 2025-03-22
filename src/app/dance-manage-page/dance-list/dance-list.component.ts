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

  newDanceName = '';

  addDance() {
    this.dancesStore.create({
      name: this.newDanceName,
      categoryId: 1,
    });
    this.newDanceName = '';
  }

  removeDance(danceId: number) {
    this.dancesStore.delete(danceId);
  }

  addSynonym(danceId: number, input: HTMLInputElement) {
    this.dancesStore.createSynonym({
      name: input.value,
      danceId,
    });
    input.value = '';
  }

  removeSynonym(synonymId: number) {
    this.dancesStore.deleteSynonym(synonymId);
  }
}
