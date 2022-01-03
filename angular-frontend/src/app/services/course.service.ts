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
    return this.webService.get('courses') as Observable<Course[]>
  }

  getCoursesByUser(): Observable<Course[]> {
    return this.webService.get('user/courses') as Observable<Course[]>
  }

  getCoursesByKeyword(payload: { name: string }): Observable<Course[]> {
    return this.webService.post('courses/search', payload) as Observable<Course[]>
  }

  addCourse(course: Course) {
    return this.webService.post('course', course);
  }

  updateCourse(course: Course) {
    return this.webService.post('course/update', course);
  }

  deleteCourse(course: Course) {
    return this.webService.post('course/delete', course);
  }

  getCoursesByFilter(payload: { level: string | undefined, free: boolean | undefined, rating: number | undefined }): Observable<Course[]> {
    return this.webService.post('/courses/filter', payload) as Observable<Course[]>
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