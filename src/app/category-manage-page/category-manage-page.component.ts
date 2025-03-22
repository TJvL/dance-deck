import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BackToTrackPlaybackButtonComponent } from '../back-to-track-playback-button/back-to-track-playback-button.component';

import { CategoryTreeComponent } from './category-tree/category-tree.component';

@Component({
  selector: 'app-category-manage-page',
  imports: [CategoryTreeComponent, BackToTrackPlaybackButtonComponent],
  templateUrl: './category-manage-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryManagePageComponent {}
