import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { CategoryTreeComponent } from './category-tree/category-tree.component';

@Component({
  selector: 'app-category-manage-page',
  imports: [FaIconComponent, CategoryTreeComponent],
  templateUrl: './category-manage-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryManagePageComponent {
  readonly arrowLeftIcon = faArrowLeft;

  private readonly router = inject(Router);

  async backToPlayback() {
    await this.router.navigate(['playback-page']);
  }
}
