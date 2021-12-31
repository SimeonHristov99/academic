import { Injectable } from '@angular/core';
import { CartItem } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: CartItem[]

  constructor() {
    this.items = [
      new CartItem('This is a test', 0.5),
      new CartItem('Hey!!', 234),
      new CartItem('Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus deleniti dolores corporis ratione iusto ipsum minus porro architecto iste id! Tempore eligendi minima illo sed quod ullam non, quae voluptatum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus deleniti dolores corporis ratione iusto ipsum minus porro architecto iste id! Tempore eligendi minima illo sed quod ullam non, quae voluptatum.', 345),
      new CartItem('Hey!!', 456),
    ]
  }
  
  getItems() {
    return this.items
  }

  getItem(id: string) {
    return this.items.find(i => i.id === id)
  }

  addItem(item: CartItem) {
    this.items.push(item)
  }

  updateItem(id: string, updateItemFields: Partial<CartItem>) {
    const item = this.getItem(id)
    Object.assign(item, updateItemFields)
  }

  deleteItem(id: string) {
    const idx = this.items.findIndex(i => i.id === id)
    if (idx == -1) return

    this.items.splice(idx, 1)
  }
}
