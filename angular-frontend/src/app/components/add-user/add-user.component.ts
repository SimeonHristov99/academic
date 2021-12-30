import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userBody: User = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    birthDate: undefined,
    type: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    if(this.userBody.type === 'organization'){
      this.userBody.lastname = this.userBody.firstname;
    }
    console.log(this.userBody);
  }
}
