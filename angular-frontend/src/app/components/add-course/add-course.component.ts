import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  courseBody: Course = {
    title: '',
    description: '',
    price: 10.0,
    raiting: undefined,
    duration: 3
  }

  constructor() { }

  ngOnInit(): void {
  }

  addCourse() {
    console.log(this.courseBody);
  }

}
