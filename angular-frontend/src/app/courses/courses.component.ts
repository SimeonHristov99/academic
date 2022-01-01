import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Greeting } from '../app.component';
import { CourseService } from '../services/course.service';
import { Course } from '../shared/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  greeting: Greeting = {
    header: 'Hello, Jim',
    context: '19:00, 1 January 2022',
    inUser: true
  };

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  courses: Course[]

  constructor(
    private courseService: CourseService
  ) {
    this.courses = []
  }

  ngOnInit(): void {
    this.headerData.emit(this.greeting)
    this.courses = this.courseService.getCourses()
  }

}
