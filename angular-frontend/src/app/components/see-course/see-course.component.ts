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
      _id: '',
      rating: 0,
      title: '',
      description: '',
      organization: '',
      level: '',
      price: 1,
      duration: 1
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id')

      if (!idParam) {
        console.log('ERROR: Invalid course id ')
        console.log(idParam)
        return
      }

      console.log(idParam)
      this.courseService.getCourses().subscribe(res => {
        const course = res.find(c => c._id === idParam)

        if (!course) {
          console.log('ERROR: Invalid course ')
          console.log(course)
          return
        }

        this.course = course
      })
    })
  }

  addToCart() {
    this.course.status = 'In Cart'

    this.cartService.addItem({
      courseId: this.course._id,
      title: this.course.title,
      description: this.course.description,
      price: this.course.price,
      willBuy: false,
    })
  }

}
