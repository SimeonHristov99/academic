import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { WebRequestService } from './web-request.service';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[]

  constructor(private webService: WebRequestService) {
    this.users = [{
      id: '',
      email: 'zdr@zdr.zdr',
      firstname: '',
      lastname: '',
      password: '',
      birthDate: undefined,
      role: ''
    }]
  }

  register(payload: Object) {
    return this.webService.post('register', payload);
  }

  getUser(id: string) {
    return this.users.find(u => u.id)
  }

  getUsers(): User[] {
    return this.users;
  }

  getUsersByCourse(payload: Object): Observable<User[]> {
    return this.webService.post('course/users', payload) as Observable<User[]>;
  }

  removeUser(payload: Object) {
    return this.webService.delete('/delete', payload);
  }

  enroll(courseId: string) {
    console.log('Will enrol ' + localStorage.getItem('userId') + ' in ' + courseId)
  }

  complete() {
    console.log('ERROR: Not implemented')
  }
}
