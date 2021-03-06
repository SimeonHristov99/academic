import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { CartService } from 'src/app/shared/cart.service';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-see-course',
  templateUrl: './see-course.component.html',
  styleUrls: ['./see-course.component.scss']
})
export class SeeCourseComponent implements OnInit, OnDestroy {

  course: Course
  payed: any = -1;
  subscriptions: Subscription[]

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cartService: CartService,
  ) {
    this.course = {
      _id: '',
      rating: 0,
      title: '',
      description: '',
      organization: '',
      level: '',
      price: 1,
      mark: 1,
      duration: 1,
      content: [{
        week: '',
        link: ''
      }]
    }

    this.subscriptions = []

    this.subscriptions.push(
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        const idParam = paramMap.get('id')

        if (!idParam) {
          console.log('ERROR: Invalid course id ')
          console.log(idParam)
          return
        }

        this.subscriptions.push(
          this.courseService.getCourses().subscribe(res => {
            const course = res.find(c => c._id === idParam)

            if (!course) {
              console.log('ERROR: Invalid course ')
              console.log(course)
              return
            }

            this.course = course
          })
        )
      })
    )

    this.getCoursesBought();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
  }

  getCoursesBought(): void {
    this.subscriptions.push(
      this.courseService.getCoursesByUser().subscribe(res => {
        this.payed = res.some(c => c._id === this.course._id) ? 1 : 0;
      })
    )
  }

  showAddToCartButton() {
    return this.cartService.getItem(this.course._id) === undefined
  }
}
