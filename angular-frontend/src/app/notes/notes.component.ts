import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Greeting } from '../app.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

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
