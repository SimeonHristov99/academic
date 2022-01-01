import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Greeting } from '../app.component';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {

  greeting: Greeting = {
    header: 'Welcome to Academic',
    context: 'Create an account or log in to access our courses'
  };

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.headerData.emit(this.greeting);
  }

  onFormSubmit(form: NgForm) {
    console.log(form)
  }
}
