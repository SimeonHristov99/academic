import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  courseBody: Course;

  constructor(private courseService: CourseService) {
    this.courseBody = {
      _id: '',
      rating: 0,
      title: '',
      description: '',
      organization: '',
      level: 'beginner',
      price: 1,
      duration: 1
    };
  }

  ngOnInit(): void {
  }

  addCourse() {
    this.courseService.addCourse(this.courseBody).subscribe(res => {
    });
  }

}
