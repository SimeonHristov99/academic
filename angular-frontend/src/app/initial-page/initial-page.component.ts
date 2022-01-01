import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Greeting } from '../app.component';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.headerData.emit(this.greeting);
  }

  onFormSubmit(form: NgForm) {
    this.authService
      .login(form.value.email, form.value.password)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res)
      })
  }


}
