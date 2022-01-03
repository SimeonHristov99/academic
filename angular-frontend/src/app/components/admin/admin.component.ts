import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  
  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });;
  }

  deleteUser(user: User): void {
    const body = {
      email: user.email
    }
    this.userService.removeUser(body).subscribe(res => {
      console.log(res);
    });
    window.location.reload();
  }

}
