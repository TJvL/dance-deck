import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { DanceListComponent } from '../dance-list/dance-list.component';

@Component({
  selector: 'app-dance-manage-page',
  imports: [FaIconComponent, ReactiveFormsModule, DanceListComponent],
  templateUrl: './dance-manage-page.component.html',
  styleUrl: './dance-manage-page.component.css',
})
export class DanceManagePageComponent {
  readonly arrowLeftIcon = faArrowLeft;

  private readonly router = inject(Router);

  async backToPlayback() {
    await this.router.navigate(['playback-page']);
  }
}
