import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[]

  constructor() {
    this.users = []
  }

  getUser(id: string) {
    return this.users.find(u => u.id)
  }

  getUsers(): User[] {
    return this.users;
  }

  enroll(userId: string, courseId: string) {
    console.log('Will enrol ' + userId + ' in ' + courseId)
  }

  complete() {
    console.log('ERROR: Not implemented')
  }
}
