import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  courseBody: Course;

  constructor() {
    this.courseBody = {
      id: '',
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
  }

  addCourse() {
    console.log(JSON.stringify(this.courseBody));
  }

}
