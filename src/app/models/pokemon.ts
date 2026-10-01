export interface Pokemon {
  id: number;
  name: string;
  type: string;
  region: 'Kanto' | 'Johto' | 'Hoenn';
  heldItem: string;
  description: string;
}

export interface MartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  icon: string;
}

export interface CartItem {
  item: MartItem;
  quantity: number;
}
