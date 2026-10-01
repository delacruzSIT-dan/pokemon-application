import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="navbar">
      <h1>Pokémon Regional Dex & PokéMart</h1>
      <nav>
        <a routerLink="/region/kanto" routerLinkActive="active">Kanto</a>
        <a routerLink="/region/johto" routerLinkActive="active">Johto</a>
        <a routerLink="/region/hoenn" routerLinkActive="active">Hoenn</a>
        <a routerLink="/pokemart" routerLinkActive="active">PokéMart</a>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar { background: #cc0000; color: white; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; }
    nav a { color: white; text-decoration: none; margin-left: 15px; font-weight: bold; padding: 6px 12px; border-radius: 4px; }
    nav a.active { background: white; color: #cc0000; }
    main { max-width: 1200px; margin: 0 auto; }
  `]
})
export class App {}
