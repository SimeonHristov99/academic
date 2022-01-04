import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { CartItem } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  items: CartItem[]
  subscriptions: Subscription[]

  constructor(private userService: UserService) {
    this.items = []
    this.subscriptions = []
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
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

  buyItem(courseId: string) {
    this.subscriptions.push(
      this.userService.enroll(courseId).subscribe(res => {
        console.log(res)
      })
    )
  }
}
