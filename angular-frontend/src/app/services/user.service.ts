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

  getUserList(): User[] {
    return [{
      email: 'ivan@gmail.com',
      firstname: 'Ivan',
      lastname: 'Ivanov'
    },
    {
      email: 'dimitar@gmail.com',
      firstname: 'Dimitar',
      lastname: 'Dimitrov'
    },
    {
      email: 'kaloyan@gmail.com',
      firstname: 'Kaloyan',
      lastname: 'Kaloyanov'
    },
    {
      email: 'petar@gmail.com',
      firstname: 'Petar',
      lastname: 'Petrov'
    }];
  }
}
