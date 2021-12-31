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
    this.users = this.userService.getUserList();
  }

  deleteUser(id: any): void {
    window.location.reload();
  }

}
