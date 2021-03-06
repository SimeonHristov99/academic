import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {

  @Input()
  course: Course;
  payed: boolean = false;

  constructor(private cartService: CartService) {
    this.course = {
      _id: '',
      rating: 0,
      title: '',
      description: '',
      organization: '',
      level: '',
      price: 1,
      mark: 0,
      duration: 1,
      content: [{
        week: '',
        link: ''
      }]
    };
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addItem({
      courseId: this.course._id,
      title: this.course.title,
      description: this.course.description,
      price: this.course.price,
      willBuy: false,
    })
  }

  showAddToCartButton() {
    return this.cartService.getItem(this.course._id)
  }
}
