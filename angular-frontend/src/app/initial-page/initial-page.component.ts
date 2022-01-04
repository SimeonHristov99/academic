import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Greeting } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit, OnDestroy {

  greeting: Greeting
  errorText: string
  date: Date = new Date()
  subscriptions: Subscription[]

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  constructor(
    private authService: AuthService
  ) {
    this.greeting = {
      header: 'Welcome to Academic',
      context: '' + this.date
    }

    this.errorText = ''
    this.subscriptions = []
  }

  ngOnInit(): void {
    if (document.cookie) {
      this.authService.logout()
    }

    this.headerData.emit(this.greeting);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
  }

  onFormSubmit(form: NgForm) {
    this.subscriptions.push(
      this.authService
        .login(form.value.email, form.value.password)
        .subscribe({
          error: (_) => {
            this.errorText = 'Invalid email or password'
          }
        })
    )
  }

}
