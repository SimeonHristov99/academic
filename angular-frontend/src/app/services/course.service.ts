import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../shared/course.model';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  getStudentListByCourse(): User[] {
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
    }
  ];
  }

  getCourse(): Course {
    return {
      title: 'AI',
      description: 'AI Advanced',
      price: 24.90,
      raiting: 8.9,
      duration: 15
    };
  }

  getCourseList(): Course[] {
    return [{
      title: 'AI',
      description: 'AI Basics',
      price: 15.75,
      raiting: 9.0,
      duration: 10
    },
    {
      title: 'Algorithms',
      description: 'Algorithms Advanced',
      price: 24.90,
      raiting: 8.9,
      duration: 15
    },
    {
      title: 'OOP',
      description: 'Everything you have to know',
      price: 7.90,
      raiting: 7.1,
      duration: 4
    },
    ];
  }
}