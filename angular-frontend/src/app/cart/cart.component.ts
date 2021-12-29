import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Greeting } from '../app.component';
import { CartItem } from '../shared/cart.model';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
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

}
