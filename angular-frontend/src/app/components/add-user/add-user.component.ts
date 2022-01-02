import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../shared/user.model';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userBody: User;

  constructor(private userService: UserService) {
    this.userBody = {
      id: '',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      birthDate: undefined,
      role: ''
    };
  }

  ngOnInit(): void {
  }

  register() {
    if (this.userBody.role === 'organization') {
      this.userBody.lastname = this.userBody.firstname;
    }
    console.log(this.userBody);
    this.userService.register(this.userBody).subscribe(res => {
      console.log(res)
    });
  }
}
