import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Greeting } from '../app.component';
import { CartItem } from '../shared/cart.model';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('cartItemAnim', [
      transition(':leave', [
        animate(200, style({
          opacity: 0,
          height: 0,
          marginBottom: 0
        }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {

  greeting: Greeting
  date: Date = new Date();

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter()

  items: CartItem[]

  constructor(
    private cartService: CartService
  ) {
    this.greeting = {
      header: `Hello, ${localStorage.getItem('firstName')}`,
      context: '' + this.date,
      inUser: true
    }

    this.items = []
  }

  ngOnInit(): void {
    this.headerData.emit(this.greeting)
    this.items = this.cartService.getItems()
  }

  toggleWillBuy(item: CartItem) {
    this.cartService.updateItem(item.courseId, { willBuy: !item.willBuy })
  }

  onDeleteClick(item: CartItem) {
    this.cartService.deleteItem(item.courseId)
  }

  getItemsToBuy() {
    return this.items.filter(s => s.willBuy)
  }

}
