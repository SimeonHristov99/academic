import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Greeting } from '../app.component';

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
  };

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.headerData.emit(this.greeting);
  }

}
