import { Injectable } from '@angular/core';
import { CartItem } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: CartItem[]

  constructor() {
    this.items = []
  }
  
  getItems() {
    return this.items
  }

  getItem(id: string) {
    return this.items.find(i => i.courseId === id)
  }

  addItem(item: CartItem) {
    this.items.push(item)
  }

  updateItem(id: string, updateItemFields: Partial<CartItem>) {
    const item = this.getItem(id)
    Object.assign(item, updateItemFields)
  }

  deleteItem(id: string) {
    const idx = this.items.findIndex(i => i.courseId === id)
    if (idx == -1) return
    this.items.splice(idx, 1)
  }
}
