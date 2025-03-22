import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaConfig } from '@fortawesome/angular-fontawesome';

import { InfoDisplayToastComponent } from './info-display/info-display-toast/info-display-toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfoDisplayToastComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly faConfig = inject(FaConfig);

  constructor() {
    this.faConfig.fixedWidth = true;
  }
}
