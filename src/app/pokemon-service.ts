import { Injectable, signal, computed } from '@angular/core';
import { Pokemon, MartItem, CartItem } from './models/pokemon';
@Injectable({ providedIn: 'root' })
export class PokemonService {
  private pokemonList = signal<Pokemon[]>([

    { id: 1, name: 'Charizard', type: 'Fire / Flying', region: 'Kanto', heldItem: 'Charcoal', description: 'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.'},
    { id: 2, name: 'Blastoise', type: 'Water', region: 'Kanto', heldItem: 'Mystic Water', description: 'The rocket cannons on its shell fire jets of water capable of punching holes through thick steel.'},
    { id: 3, name: 'Venusaur', type: 'Grass / Poison', region: 'Kanto', heldItem: 'Miracle Seed', description: 'A bewitching aroma wafts from its flower, soothing those in battle and calming emotions.'},
    { id: 4, name: 'Pikachu', type: 'Electric', region: 'Kanto', heldItem: 'Light Ball', description: 'Pouch-like sacs on its cheeks store electricity. It zaps enemies when startled or agitated.'},
    { id: 5, name: 'Gengar', type: 'Ghost / Poison', region: 'Kanto', heldItem: 'Spell Tag', description: 'Hides in shadows. It is said that if Gengar is hiding in a room, the temperature drops by 10 degrees.'},
    { id: 6, name: 'Dragonite', type: 'Dragon / Flying', region: 'Kanto', heldItem: 'Dragon Scale', description: 'An extremely rarely seen marine Pokémon. It is said to fly around the globe in 16 hours.'},

    { id: 7, name: 'Typhlosion', type: 'Fire', region: 'Johto', heldItem: 'Charcoal', description: 'It can cause forest fires by blowing out fire of over 3,600 degrees Fahrenheit from its mouth.'},
    { id: 8, name: 'Feraligatr', type: 'Water', region: 'Johto', heldItem: 'Mystic Water', description: 'It uses its powerful jaws to crush prey, and its body is covered in thick scales that protect it from attacks.'},
    { id: 9, name: 'Meganium', type: 'Grass', region: 'Johto', heldItem: 'Miracle Seed', description: 'Its breath has the ability to revive dead plants. It is said that if it inhales deeply, it can make flowers bloom.'},
    { id: 10, name: 'Ampharos', type: 'Electric', region: 'Johto', heldItem: 'Light Ball', description: 'The tip of its tail shines brightly and can be seen from far away. It has been used as a beacon for ships.'},
    { id: 11, name: 'Misdreavous', type: 'Ghost', region: 'Johto', heldItem: 'Spell Tag', description: 'It frightens people by wailing in a creepy voice. It is said that it can steal the spirit of anyone who hears its cry.'},
    { id: 12, name: 'Salamence', type: 'Dragon / Flying', region: 'Johto', heldItem: 'Dragon Scale', description: 'It has wings that are small and underdeveloped. It is said to be able to fly only if it is highly motivated.'},

    { id: 13, name: 'Blaziken', type: 'Fire / Fighting', region: 'Hoenn', heldItem: 'Charcoal', description: 'It can launch its burning fists at high speed. It is said to be able to punch holes through thick steel.'},
    { id: 14, name: 'Swampert', type: 'Water / Ground', region: 'Hoenn', heldItem: 'Mystic Water', description: 'It can swim at a speed of over 25 knots. It is said to be able to create whirlpools by spinning its tail.'},
    { id: 15, name: 'Sceptile', type: 'Grass', region: 'Hoenn', heldItem: 'Miracle Seed', description: 'It has a leaf on its tail that it uses to sense the air and detect movements. It is said to be able to predict the weather.'},
    { id: 16, name: 'Manectric', type: 'Electric', region: 'Hoenn', heldItem: 'Light Ball', description: 'It can generate electricity in its mane. It is said to be able to create thunderclouds by running at high speed.'},
    { id: 17, name: 'Banette', type: 'Ghost', region: 'Hoenn', heldItem: 'Spell Tag', description: 'It is said to be a doll that was abandoned by its owner and became a Pokémon. It seeks revenge on the one who disowned it.'},
    { id: 18, name: 'Salamence', type: 'Dragon / Flying', region: 'Hoenn', heldItem: 'Dragon Scale', description: 'It has wings that are small and underdeveloped. It is said to be able to fly only if it is highly motivated.' }
  ]);

  martCatalog = signal<MartItem[]>([
    { id: 101, name: 'Poké Ball', price: 200, category: 'Ball', icon: '🔴' },
    { id: 102, name: 'Great Ball', price: 600, category: 'Ball', icon: '🔵' },
    { id: 103, name: 'Ultra Ball', price: 1200, category: 'Ball', icon: '🟡' },
    { id: 104, name: 'Potion', price: 300, category: 'Medicine', icon: '🧪' },
    { id: 105, name: 'Super Potion', price: 700, category: 'Medicine', icon: '🥛' },
    { id: 106, name: 'Hyper Potion', price: 1500, category: 'Medicine', icon: '🍷' },
    { id: 107, name: 'Revive', price: 1500, category: 'Medicine', icon: '💎' },
    { id: 108, name: 'Antidote', price: 100, category: 'Status', icon: '💊' },
    { id: 109, name: 'Paralyze Heal', price: 200, category: 'Status', icon: '⚡' },
    { id: 110, name: 'Escape Rope', price: 550, category: 'General', icon: '🪢' }
  ]);

  private cartState = signal<CartItem[]>([]);
  public cart = this.cartState.asReadonly();

  public totalPrice = computed(() =>
    this.cartState().reduce((sum, entry) => sum + (entry.item.price * entry.quantity), 0)  );

  public totalItemCount = computed(() =>
    this.cartState().reduce((count, entry) => count + entry.quantity, 0)
  );

  addToCart(product: MartItem) {
    this.cartState.update(items => {
      const existing = items.find(i => i.item.id === product.id);
      if (existing) {
        return items.map(i => i.item.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { item: product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number) {
    this.cartState.update(items => items.filter(i => i.item.id !== productId));
  }

  clearCart() {
    this.cartState.set([]);
  }

  getPokemonByRegion(regionName: string): Pokemon[] {
  return this.pokemonList().filter(
    p => p.region.toLowerCase() === regionName.toLowerCase()
  );
}

}
