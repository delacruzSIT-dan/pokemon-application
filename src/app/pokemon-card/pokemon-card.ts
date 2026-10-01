import { Component, input, output } from '@angular/core';
import { Pokemon } from '.././models/pokemon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  template: `
    <div class="card" (click)="cardSelected.emit(pokemon().name)">
      <div class="card-header">
        <h3>{{ pokemon().name }}</h3>
      </div>
      <p class="type"><strong>Type:</strong> {{ pokemon().type }}</p>
      <p class="item"><strong>Held Item:</strong>{{ pokemon().heldItem }}</p>
      <p class="desc">{{ pokemon().description }}</p>
    </div>
  `,
  styles: [`
    .card {
      border: 2px solid #333;
      border-radius: 10px;
      padding: 15px;
      background: #fdfdfd;
      box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .card:hover { transform: translateY(-4px); }
    .card-header { display: flex; align-items: center; gap: 10px; }
    .icon { font-size: 2rem; }
    .type { color: #e63946; font-weight: bold; }
    .item { color: #2a9d8f; }
    .desc { font-size: 0.9rem; color: #555; }
  `]
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
  cardSelected = output<string>();
}
