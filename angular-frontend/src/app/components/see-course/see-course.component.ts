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
  payed: boolean = false;

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

    this.getCoursesBought();

  }


  getCoursesBought(): void {
    this.courseService.getCoursesByUser().subscribe(res => {
      this.payed = res.some(c => c._id === this.course._id);
    })
  }

}
