import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../shared/user.model';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  userBody: User
  isError: boolean
  errorMessage: string
  subscriptions: Subscription[]

  constructor(
    private userService: UserService,
    public router: Router
  ) {
    this.userBody = {
      id: '',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      birthDate: undefined,
      role: '',
      url: ''
    }

    this.isError = false
    this.errorMessage = ''
    this.subscriptions = []
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
  }

  register() {
    if (this.userBody.role === 'organization') {
      this.userBody.lastname = this.userBody.firstname;
    }

    let firstname = this.userBody.firstname
    if (!firstname) {
      firstname = this.userBody.email.split('@')[0]
    }
    localStorage.setItem('firstName', firstname)

    this.subscriptions.push(
      this.userService.register(this.userBody).subscribe({
        next: (res: any) => {
          console.log(res);
          localStorage.setItem('orgId', res.id)
          this.isError = false;
          this.errorMessage = '';

          const role = this.userBody.role == 'organisation' ? 'organization' : this.userBody.role
          const options = this.userBody.role === "user" ? `/courses` : ''

          this.router.navigateByUrl(
            `/${role}${options}`
          )
        },
        error: (err) => {
          this.isError = true;
          this.errorMessage = err.error.error;
        }
      })
    )
  }
}
