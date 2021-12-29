import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../shared/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem;

  constructor() {
    this.cartItem = new CartItem('NA')
  }

  ngOnInit(): void {
  }

}
