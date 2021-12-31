import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Greeting } from '../app.component';
import { CartItem } from '../shared/cart.model';
import { CartService } from '../shared/cart.service';

declare var paypal: any;

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

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined
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

    paypal
      .Buttons({
        createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { description: string; amount: { currency_code: string; value: number; }; }[]; }) => any; }; }) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.items[0].description,
                amount: {
                  currency_code: 'USD',
                  value: this.items[0].price
                }
              }
            ]
          })
        },
        onApprove: async (data: any, actions: { order: { capture: () => any; }; }) => {
          const order = await actions.order.capture()
          this.cartService.deleteItem(this.items[0].id)
          console.log(order)
        },
        onError: (err: any) => {
          console.log(err)
        }
      })
      .render(this.paypalElement?.nativeElement)
  }

  toggleWillBuy(item: CartItem) {
    this.cartService.updateItem(item.id, { willBuy: !item.willBuy })
  }

  onDeleteClick(item: CartItem) {
    this.cartService.deleteItem(item.id)
  }

  getItemsToBuy() {
    return this.items.filter(s => s.willBuy)
  }

}
