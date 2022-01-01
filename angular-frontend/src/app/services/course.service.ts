import { Injectable } from '@angular/core';
import { Course } from '../shared/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: Course[]

  constructor() {
    this.courses = [
      new Course('AI For Everyone 1',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, asperiores? Veritatis eos reiciendis quis enim iste quos distinctio aliquid perspiciatis, et eveniet, expedita alias consectetur perferendis, quaerat nesciunt blanditiis amet.',
        'DeepLearningAI.com',
        'Beginner',
        'https://www.youtube.com/watch?v=NWONeJKn6kc',
        700, 5, 5),
      new Course('AI For Everyone 2',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, asperiores? Veritatis eos reiciendis quis enim iste quos distinctio aliquid perspiciatis, et eveniet, expedita alias consectetur perferendis, quaerat nesciunt blanditiis amet.',
        'DeepLearningAI.com',
        'Intermediate',
        'https://www.youtube.com/watch?v=NWONeJKn6kc',
        700, 5, 5),
      new Course('AI For Everyone 3',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, asperiores? Veritatis eos reiciendis quis enim iste quos distinctio aliquid perspiciatis, et eveniet, expedita alias consectetur perferendis, quaerat nesciunt blanditiis amet.',
        'DeepLearningAI.com',
        'Advanced',
        'https://www.youtube.com/watch?v=NWONeJKn6kc',
        700, 5, 5)
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
}