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
    price: 1.0,
    raiting: 0.0,
    duration: 1
  };

  constructor() { }

  ngOnInit(): void {
  }

  addCourse() {
    console.log(JSON.stringify(this.courseBody));
  }

}
