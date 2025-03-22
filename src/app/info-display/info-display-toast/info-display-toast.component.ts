import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy } from '@angular/core';

import { ErrorStore } from '../error.store';

@Component({
  selector: 'app-info-display-toast',
  imports: [NgClass],
  templateUrl: './info-display-toast.component.html',
  styleUrl: './info-display-toast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoDisplayToastComponent implements OnDestroy {
  readonly duration = 5000;
  readonly exitDuration = 300;
  readonly errorStore = inject(ErrorStore);

  animationClass = 'animate-slide-in';

  private showEffect = effect(() => {
    const error = this.errorStore.applicationError();
    if (error) {
      this.animationClass = 'animate-slide-in';
    }
  });

  private fadeEffect = effect(() => {
    if (this.errorStore.applicationError()) {
      setTimeout(() => {
        this.animationClass = 'animate-slide-out';
        setTimeout(() => {
          this.errorStore.setError(null);
        }, this.exitDuration);
      }, this.duration - this.exitDuration);
    }
  });

  ngOnDestroy(): void {
    this.showEffect.destroy();
    this.fadeEffect.destroy();
  }
}
