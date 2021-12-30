import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): User {
    return {
      email: 'ivan@gmail.com',
      firstname: 'Ivan',
      lastname: 'Ivanov'
    };
  }
}
