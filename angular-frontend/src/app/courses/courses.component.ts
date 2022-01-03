import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Greeting } from '../app.component';
import { CourseService } from '../services/course.service';
import { Course } from '../shared/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  greeting: Greeting;

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  courses: Course[]
  coursesBought: Course[]

  constructor(private courseService: CourseService) {
    this.greeting = {
      header: `Hello, ${localStorage.getItem('firstName')}`,
      context: '19:00, 1 January 2022',
      inUser: true
    }

    this.courses = []
    this.coursesBought = []
  }

  ngOnInit(): void {
    this.headerData.emit(this.greeting)
    this.getCourses()
    this.getCoursesBought()
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(res => {
      this.courses = res;
    })
  }

  getCoursesBought(): void {
    this.courseService.getCoursesByUser().subscribe(res => {
      this.coursesBought = res
      console.log(this.coursesBought)
    })
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value.search)
    this.courseService.getCoursesByKeyword(form.value.search).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log('ERROR:')
        console.log(err)
      }
    })
  }

  onFiltersFormSubmit(form: NgForm) {
    console.log(Object.keys(
      Object.fromEntries(
        Object
          .entries(form.form.value)
          .filter(([_, value]) => value === true)
    )))

    form.resetForm()

    // Go to API to search here
  }

}
