import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Greeting } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {

  greeting: Greeting
  errorText: string
  date: Date = new Date();

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  constructor(
    private authService: AuthService
  ) {
    this.greeting = {
      header: 'Welcome to Academic',
      context: '' + this.date
    }

    this.errorText = ''
  }

  ngOnInit(): void {
    if(document.cookie) {
      this.authService.logout()
    }

    this.headerData.emit(this.greeting);
  }

  onFormSubmit(form: NgForm) {
    this.authService
      .login(form.value.email, form.value.password)
        .subscribe({
          error: (_) => {
            this.errorText = 'Invalid email or password'
          }
        })
  }

}
