import { Injectable } from '@angular/core';
import { Course } from '../shared/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: Course[]

  constructor() {
    this.courses = [
      new Course('AI', 'AI descrption', 'https://www.youtube.com/watch?v=NWONeJKn6kc', 700, 5, 5)
    ]
  }

  getCourses() {
    return this.courses
  }

  getCourse(id: string) {
    return this.courses.find(c => c.id === id)
  }

  addCourse(course: Course) {
    this.courses.push(course)
  }

  updateCourse(id: string, updatedFields: Partial<Course>){
    const course = this.getCourse(id)
    Object.assign(course, updatedFields)
  }

  deleteCourse(id: string) {
    const courseIdx = this.courses.findIndex(c => c.id === id)
    if(courseIdx == -1) return
    this.courses.splice(courseIdx, 1)    
  }
}