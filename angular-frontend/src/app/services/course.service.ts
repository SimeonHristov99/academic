import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../shared/course.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: Course[]

  constructor(private webService: WebRequestService) {
    this.courses = [
      {
        id: '1',
        rating: 3,
        title: 'AI For Everyone 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, asperiores? Veritatis eos reiciendis quis enim iste quos distinctio aliquid perspiciatis, et eveniet, expedita alias consectetur perferendis, quaerat nesciunt blanditiis amet.',
        organization: 'DeepLearningAI.com',
        level: 'Beginner',
        url: 'https://www.youtube.com/watch?v=NWONeJKn6kc',
        price: 700,
        duration: 5
      },
      {
        id: '2',
        rating: 4,
        title: 'AI For Everyone 2',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, asperiores? Veritatis eos reiciendis quis enim iste quos distinctio aliquid perspiciatis, et eveniet, expedita alias consectetur perferendis, quaerat nesciunt blanditiis amet.',
        organization: 'DeepLearningAI.com',
        level: 'Intermediate',
        url: 'https://www.youtube.com/watch?v=NWONeJKn6kc',
        price: 750,
        duration: 6
      },
      {
        id: '3',
        rating: 5,
        title: 'AI For Everyone 3',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, asperiores? Veritatis eos reiciendis quis enim iste quos distinctio aliquid perspiciatis, et eveniet, expedita alias consectetur perferendis, quaerat nesciunt blanditiis amet.',
        organization: 'DeepLearningAI.com',
        level: 'Advanced',
        url: 'https://www.youtube.com/watch?v=NWONeJKn6kc',
        price: 1000,
        duration: 7
      },
    ]
  }

  getCourses(): Observable<Course[]> {
    return this.webService.get('courses') as Observable<Course[]>;
  }

  getCourse(id: string) {
    return this.courses.find(c => c.id === id)
  }

  addCourse(course: Course) {
    this.courses.push(course)
  }

  updateCourse(id: string, updatedFields: Partial<Course>) {
    const course = this.getCourse(id)
    Object.assign(course, updatedFields)
  }

  deleteCourse(id: string) {
    const courseIdx = this.courses.findIndex(c => c.id === id)
    if (courseIdx == -1) return
    this.courses.splice(courseIdx, 1)
  }

  buyCourse(id: string) {
    
  }

  getStudentListByCourse() {
    return [{
      id: '',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      birthDate: undefined,
      role: ''
    }]
  }
}