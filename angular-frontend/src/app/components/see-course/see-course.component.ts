import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { CartService } from 'src/app/shared/cart.service';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-see-course',
  templateUrl: './see-course.component.html',
  styleUrls: ['./see-course.component.scss']
})
export class SeeCourseComponent implements OnInit {

  course: Course

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cartService: CartService,
    private router: Router
  ) {
    this.course = {
      id: '',
      rating: 0,
      title: '',
      description: '',
      organization: '',
      level: '',
      url: '',
      price: 1,
      duration: 1
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id')

      if(!idParam) {
        console.log('ERROR: Invalid course id ')
        console.log(idParam)
        return
      }

      const course = this.courseService.getCourse(idParam)

      if(!course) {
        console.log('ERROR: Invalid course ')
        console.log(course)
        return
      }

      this.course = course
    })
  }

  addToCart() {
    this.course.status = 'In Cart'

    this.cartService.addItem({
      courseId: this.course.id,
      title: this.course.title,
      description: this.course.description,
      price: this.course.price,
      willBuy: false,
    })
  }

}
