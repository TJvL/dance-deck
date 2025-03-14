import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { DanceDto } from '../../data-transfer-objects';

@Component({
  selector: 'app-dance-list',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './dance-list.component.html',
  styleUrl: './dance-list.component.css',
})
export class DanceListComponent {
  readonly trashIcon = faTrash;
  readonly plusIcon = faPlus;

  readonly dances = signal<DanceDto[]>([
    {
      displayName: 'Wals',
      category: 'Walsen',
      synonyms: ['Wals in 3'],
    },
    {
      displayName: 'Branle Béarnais',
      category: 'Bretons',
      synonyms: ["Branle de la Vallée d'Ossau", "Branle d'Ossau"],
    },
    {
      displayName: 'Mazurka',
      category: 'Koppeldansen',
      synonyms: [],
    },
  ]);

  readonly categoryNames = signal<string[]>(['Walsen', 'Bretons', 'Koppeldansen', 'Poitou']);
}
