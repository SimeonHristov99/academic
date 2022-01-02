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
    this.courses = []
  }

  getCourses(): Observable<Course[]> {
    return this.webService.get('courses') as Observable<Course[]>;
  }

  getCoursesByUser(): Observable<Course[]> {
    return this.webService.get('user/courses') as Observable<Course[]>;
  }

  // getCourse(id: string) {
  //   return this.webService.get('courses') as Observable<Course[]>
  // }

  addCourse(course: Course) {
    this.courses.push(course)
  }

  // updateCourse(id: string, updatedFields: Partial<Course>) {
  //   const course = this.getCourse(id)
  //   Object.assign(course, updatedFields)
  // }

  deleteCourse(id: string) {
    const courseIdx = this.courses.findIndex(c => c._id === id)
    if (courseIdx == -1) return
    this.courses.splice(courseIdx, 1)
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