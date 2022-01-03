import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { WebRequestService } from './web-request.service';
import { HttpResponse } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[]

  constructor(private webService: WebRequestService) {
    this.users = []
  }

  register(payload: Object) {
    return this.webService.post('register', payload)
  }

  getUser(id: string) {
    return this.users.find(u => u.id)
  }

  getUsers(): Observable<User[]> {
    return this.webService.get('users') as Observable<User[]>
  }

  getUsersByCourse(payload: Object): Observable<User[]> {
    return this.webService.post('course/users', payload) as Observable<User[]>
  }

  submitStudentMark(payload: Object) {
    return this.webService.post('/user/course/mark', payload);
  }

  removeUser(payload: Object) {
    return this.webService.delete('delete', payload)
  }

  enroll(courseId: string) {
    return this.webService.post('/course/enroll', { course_id: courseId })
  }

  complete() {
    console.log('ERROR: Not implemented')
  }
}
