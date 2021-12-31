import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../shared/cart.model';

@Component({
  selector: 'app-sidebar-info',
  templateUrl: './sidebar-info.component.html',
  styleUrls: ['./sidebar-info.component.scss']
})
export class SidebarInfoComponent implements OnInit {

  @Input() itemsToBuy: CartItem[]

  constructor() {
    this.itemsToBuy = []
  }

  ngOnInit(): void {
  }

  getSum(items: CartItem[]) {
    return items.map(s => s.price).reduce((x, a) => x + a, 0)
  }

}
