import { Routes } from '@angular/router';
import { RegionListComponent } from './region-list/region-list';
import { PokemartComponent } from './pokemart/pokemart';

export const routes: Routes = [
  { path: '', redirectTo: 'region/kanto', pathMatch: 'full' },
  { path: 'region/:region', component: RegionListComponent },
  { path: 'pokemart', component: PokemartComponent },
  { path: '**', redirectTo: 'region/kanto' }
];
