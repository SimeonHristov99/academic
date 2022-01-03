import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../shared/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem;
  @Output() deleteClick: EventEmitter<void>

  constructor() {
    this.cartItem = {
      courseId: '1',
      title: 'NA',
      description: 'NA',
      price: 1,
      willBuy: false
    }

    this.deleteClick = new EventEmitter()
  }

  ngOnInit(): void {
  }

  onDeleteClick(): void {
    this.deleteClick.emit()
  }

}
