import { Injectable } from '@angular/core';
import { CartItem } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: CartItem[]

  constructor() {
    this.items = [
      {
        courseId: '1',
        title: 'Title 1',
        description: 'This is a test',
        price: 0.5,
        willBuy: false,
      },
      {
        courseId: '2',
        title: 'Title 2',
        description: 'heyy!!',
        price: 234,
        willBuy: false,
      },
      {
        courseId: '3',
        title: 'Title 3',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus deleniti dolores corporis ratione iusto ipsum minus porro architecto iste id! Tempore eligendi minima illo sed quod ullam non, quae voluptatum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus deleniti dolores corporis ratione iusto ipsum minus porro architecto iste id! Tempore eligendi minima illo sed quod ullam non, quae voluptatum.',
        price: 345,
        willBuy: false,
      },
      {
        courseId: '4',
        title: 'Title 4',
        description: 'Yo!',
        price: 456,
        willBuy: false,
      },
    ]
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
