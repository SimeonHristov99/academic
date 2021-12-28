import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Greeting } from '../app.component';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  greeting: Greeting = {
    header: 'Hello, Jim',
    context: '19:00, 1 January 2022'
  };

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.headerData.emit(this.greeting);
  }

}
