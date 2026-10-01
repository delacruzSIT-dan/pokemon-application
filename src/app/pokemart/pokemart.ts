import { Component, inject } from '@angular/core';
import { PokemonService } from '../pokemon-service';

@Component({
  selector: 'app-pokemart',
  standalone: true,
  template: `
    <div class="mart-layout">
      <div class="catalog">
        <h2>PokéMart Store</h2>
        <div class="item-grid">
          @for (item of pokemonService.martCatalog(); track item.id) {
            <div class="item-card">
              <span class="item-icon">{{ item.icon }}</span>
              <h4>{{ item.name }}</h4>
              <p class="category">{{ item.category }}</p>
              <p class="price">₱{{ item.price }}</p>
              <button (click)="pokemonService.addToCart(item)">Buy Item</button>
            </div>
          }
        </div>
      </div>

      <div class="cart-panel">
  <h3>Your Cart ({{ pokemonService.totalItemCount() }})</h3>

  @for (entry of pokemonService.cart(); track entry.item.id) {
    <div class="cart-row">
      <span>{{ entry.item.icon }} {{ entry.item.name }} x{{ entry.quantity }}</span>
      <span>₱{{ entry.item.price * entry.quantity }}</span>
      <button class="remove-btn" (click)="pokemonService.removeFromCart(entry.item.id)">❌</button>
    </div>
  } @empty {
    <p class="empty-msg">Your cart is currently empty.</p>
  }

  <hr>
  <div class="total">
    <h3>🛒 Cart Total: ₱{{ pokemonService.totalPrice() }}</h3>
  </div>
  <button class="checkout-btn" [disabled]="pokemonService.cart().length === 0" (click)="pokemonService.clearCart()">
    Checkout / Reset Cart
  </button>
</div>
  `,
  styles: [`
    .mart-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; padding: 20px; }
    .item-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
    .item-card { border: 1px solid #ccc; border-radius: 8px; padding: 12px; text-align: center; background: #fff; }
    .item-icon { font-size: 2.5rem; }
    .price { font-weight: bold; color: #2a9d8f; }
    .cart-panel { border: 2px solid #000; padding: 15px; border-radius: 8px; background: #fdfae7; height: fit-content; }
    .cart-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .remove-btn { background: none; border: none; cursor: pointer; }
    .checkout-btn { width: 100%; padding: 10px; background: #e63946; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
    .checkout-btn:disabled { background: #ccc; cursor: not-allowed; }
  `]
})
export class PokemartComponent {
  pokemonService = inject(PokemonService);
}
