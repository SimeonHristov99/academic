import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../shared/user.model';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userBody: User
  isError: boolean
  errorMessage: string

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
      role: ''
    }

    this.isError = false
    this.errorMessage = ''
  }

  ngOnInit(): void {
  }

  register() {
    if (this.userBody.role === 'organization') {
      this.userBody.lastname = this.userBody.firstname;
    }

    let firstname = this.userBody.firstname
    if(!firstname) {
      firstname = this.userBody.email.split('@')[0]
    }
    localStorage.setItem('firstName', firstname)

    this.userService.register(this.userBody).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('orgId', res.id)
        this.isError = false;
        this.errorMessage = '';

        const role = this.userBody.role == 'organisation' ? 'organization' : this.userBody.role

        this.router.navigateByUrl(
          `/${role}${this.userBody.role === "user" ? `/courses` : ''}`
        )  
      },
      error: (err) => {
        this.isError = true;
        this.errorMessage = err.error.error;
      }
    })

    
  }
}
