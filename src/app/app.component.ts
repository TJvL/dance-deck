import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaConfig } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly faConfig = inject(FaConfig);

  constructor() {
    this.faConfig.fixedWidth = true;
  }
}
