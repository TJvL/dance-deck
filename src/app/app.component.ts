import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import DatabaseService from './database.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  providers: [DatabaseService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly database = inject(DatabaseService);
}
