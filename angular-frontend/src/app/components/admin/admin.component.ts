import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  users: User[] = [];
  subscriptions: Subscription[]

  constructor(private userService: UserService) {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.getUserList();
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
  }

  getUserList(): void {
    this.subscriptions.push(
      this.userService.getUsers().subscribe(res => {
        this.users = res;
      })
    )
  }

  deleteUser(user: User): void {
    const body = {
      email: user.email
    }

    this.subscriptions.push(
      this.userService.removeUser(body).subscribe(res => {
        console.log(res)
      })
    )

    window.location.reload();
  }

}
