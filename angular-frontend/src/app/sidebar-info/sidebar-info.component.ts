import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CartItem } from '../shared/cart.model';
import { CartService } from '../shared/cart.service';

declare var paypal: any;

@Component({
  selector: 'app-sidebar-info',
  templateUrl: './sidebar-info.component.html',
  styleUrls: ['./sidebar-info.component.scss']
})
export class SidebarInfoComponent implements OnInit {

  @Input() itemsToBuy: CartItem[]

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined

  constructor(private cartService: CartService) {
    this.itemsToBuy = []
  }

  ngOnInit(): void {
    paypal
    .Buttons({
      createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { description: string; amount: { currency_code: string; value: number; }; }[]; }) => any; }; }) => {
        return actions.order.create({
          purchase_units: this.itemsToBuy.map(i => ({
            reference_id: i.courseId,
            description: i.description.slice(0, 127),
            amount: {
              currency_code: 'USD',
              value: i.price
            }})
          )
        })
      },
      onApprove: async (data: any, actions: { order: { capture: () => any; }; }) => {
        const order = await actions.order.capture()
        this.itemsToBuy.map(i => this.cartService.buyItem(i.courseId))
        this.itemsToBuy.map(i => this.cartService.deleteItem(i.courseId))
        this.itemsToBuy = []
        console.log('Transaction successful')
      },
      onError: (err: any) => {
        console.log(err)
      }
    })
    .render(this.paypalElement?.nativeElement)
  }

  getSum(itemsToBuy: CartItem[]) {
    return itemsToBuy.map(s => s.price).reduce((x, a) => x + a, 0)
  }

}
