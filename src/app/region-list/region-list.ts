import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon-service';
import { Pokemon } from '../models/pokemon';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card';

@Component({
  selector: 'app-region-list',
  standalone: true,
  imports: [PokemonCardComponent],
  template: `
    <div class="region-container">
      <h2>{{ regionName }} Region Pokémon</h2>

      @if (selectedNotice) {
        <div class="notice">You clicked on <strong>{{ selectedNotice }}</strong>!</div>
      }

      <div class="grid">
        @for (pkmn of regionPokemon; track pkmn.name) {
          <app-pokemon-card
            [pokemon]="pkmn"
            (cardSelected)="onSelectPokemon($event)">
          </app-pokemon-card>
        } @empty {
          <p>No Pokémon found for this region.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .region-container { padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; margin-top: 15px; }
    .notice { background: #e0f7fa; padding: 10px; border-radius: 5px; margin-bottom: 15px; border-left: 4px solid #00838f; }
  `]
})
export class RegionListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);

  regionName: string = 'Kanto';
  regionPokemon: Pokemon[] = [];
  selectedNotice = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const rawParam = params.get('region') || 'Kanto';

      this.regionName = rawParam.charAt(0).toUpperCase() + rawParam.slice(1).toLowerCase();

      this.regionPokemon = this.pokemonService.getPokemonByRegion(this.regionName as 'Kanto' | 'Johto' | 'Hoenn');
    });
  }

  onSelectPokemon(name: string) {
    this.selectedNotice = name;
  }
}
