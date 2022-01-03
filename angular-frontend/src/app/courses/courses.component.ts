import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Greeting } from '../app.component';
import { CourseService } from '../services/course.service';
import { CartService } from '../shared/cart.service';
import { Course } from '../shared/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  greeting: Greeting;
  date: Date

  courses: Course[]
  coursesBought: Course[]

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  constructor(
    private courseService: CourseService,
    private cartService: CartService
  ) {
    this.date = new Date()

    this.greeting = {
      header: `Hello, ${localStorage.getItem('firstName')}`,
      context: '' + this.date,
      inUser: true
    }

    this.courses = []
    this.coursesBought = []
  }

  ngOnInit(): void {
    this.headerData.emit(this.greeting)
    this.getCourses()
    this.getCoursesBought()

    const wasSearching = localStorage.getItem('searching')
    if (wasSearching) {
      this.doSearch(wasSearching)
    }
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(res => {
      this.courses = res;
    })
  }

  getCoursesBought(): void {
    this.courseService.getCoursesByUser().subscribe(res => {
      this.coursesBought = res
    })
  }

  doSearch(name: string) {
    localStorage.setItem('searching', name)

    const payload = {
      name: name
    }

    this.courseService.getCoursesByKeyword(payload).subscribe({
      next: (res) => {
        const resIds = res.map(resC => resC._id)
        this.courses = this.courses.filter(c => resIds.includes(c._id))
        console.log(this.courses)
      },
      error: (err) => {
        console.log('ERROR:')
        console.log(err)
      }
    })
  }

  onFormSubmit(form: NgForm) {
    if (form.value.search.length < 1) {
      this.getCourses()
      return
    }

    this.doSearch(form.value.search)
  }

  onFiltersFormSubmit(form: NgForm) {
    console.log(Object.keys(
      Object.fromEntries(
        Object
          .entries(form.form.value)
          .filter(([_, value]) => value === true)
      )))

    form.resetForm()

    // Go to API to filter here
  }

  getStatus(course: Course): string | undefined {
    if (this.coursesBought.find(c => c._id === course._id)) {
      return 'Bought!'
    }

    if (this.cartService.getItem(course._id)) {
      return 'In Cart!'
    }

    return undefined
  }
}
