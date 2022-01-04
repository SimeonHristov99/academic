import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Greeting } from '../app.component';
import { CourseService } from '../services/course.service';
import { CartService } from '../shared/cart.service';
import { Course } from '../shared/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  greeting: Greeting;
  date: Date

  courses: Course[]
  coursesBought: Course[]
  subscriptions: Subscription[]

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
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.headerData.emit(this.greeting)
    this.getCourses()
    this.getCoursesBought()

    const wasSearching = localStorage.getItem('searching')
    if (wasSearching) {
      this.doSearch(wasSearching)
      localStorage.removeItem('searching')
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
  }

  getCourses(): void {
    this.subscriptions.push(
      this.courseService.getCourses().subscribe(res => {
        this.courses = res
      })
    )
  }

  getCoursesBought(): void {
    this.subscriptions.push(
      this.courseService.getCoursesByUser().subscribe(res => {
        this.coursesBought = res
      })
    )
  }

  doSearch(name: string) {
    localStorage.setItem('searching', name)

    const payload = {
      name: name
    }

    this.subscriptions.push(
      this.courseService.getCoursesByKeyword(payload).subscribe({
        next: (res) => {
          const resIds = res.map(resC => resC._id)
          this.courses = this.courses.filter(c => resIds.includes(c._id))
        },
        error: (err) => {
          console.log('ERROR:')
          console.log(err)
        }
      })
    )
  }

  onFormSubmit(form: NgForm) {
    if (form.value.search.length < 1) {
      this.getCourses()
      return
    }

    this.doSearch(form.value.search)
  }

  onFiltersFormSubmit(form: NgForm) {
    const filterConditions =
      Object.keys(
        Object.fromEntries(
          Object
            .entries(form.form.value)
            .filter(([_, value]) => value === true)
        ))

    let level: string | undefined = undefined
    let free: boolean | undefined = false
    let rating: number | undefined = undefined

    filterConditions.filter(i => i !== 'isPaid').forEach(item => {
      if (item === 'isFree') {
        free = true
      }
      else if (+item) {
        rating = +item
      }
      else {
        level = item
      }
    })

    const payload = {
      level: level,
      free: free,
      rating: rating
    }

    form.resetForm()

    this.subscriptions.push(
      this.courseService.getCoursesByFilter(payload).subscribe(res => {
        this.courses = res
      })
    )
  }

  getStatus(course: Course): string | undefined {
    const courseBought = this.coursesBought.find(c => c._id === course._id)

    if (courseBought) {
      return (courseBought.mark ? 'Completed!' : 'Bought!')
    }

    if (this.cartService.getItem(course._id)) {
      return 'In Cart!'
    }

    return undefined
  }

  getCourseMark(courseId: string) {
    const course = this.coursesBought.find(c => c._id === courseId)

    return (course ? course.mark : undefined)
  }
}
