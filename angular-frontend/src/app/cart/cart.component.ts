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

  greeting: Greeting = {
    header: 'Hello, Jim',
    context: '19:00, 1 January 2022',
    inUser: true
  }

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter()

  items: CartItem[]

  constructor(
    private cartService: CartService
  ) {
    this.items = []
  }

  ngOnInit(): void {
    this.headerData.emit(this.greeting)
    this.items = this.cartService.getItems()
  }

  toggleWillBuy(item: CartItem) {
    this.cartService.updateItem(item.id, { willBuy: !item.willBuy })
  }

  onDeleteClick(item: CartItem) {
    this.cartService.deleteItem(item.id)
  }

}
