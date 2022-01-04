import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  courseBody: Course;

  constructor(private courseService: CourseService, private router: Router) {
    this.courseBody = {
      _id: '',
      rating: 0,
      title: '',
      description: '',
      organization: '',
      level: 'beginner',
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

  addField(){
    let content = [];
    for(let i = 0; i < this.courseBody.duration; i++) {
        if(i < this.courseBody.content.length) {
          content.push(this.courseBody.content[i]);
        } else {
          content.push({
            week: '',
            link: ''
          });
        }
    }
    while (this.courseBody.content.length > 0) {
      this.courseBody.content.pop();
    }
    for (let i = 0; i < content.length; i++) {
      this.courseBody.content.push(content[i]);
    }
  }

  addCourse() {
    let courseBody: any = {
      rating: this.courseBody.rating,
      title: this.courseBody.title,
      description: this.courseBody.description,
      organization: this.courseBody.organization,
      level: this.courseBody.level,
      price: this.courseBody.price,
      duration: this.courseBody.duration,
      content: this.courseBody.content
    }
    console.log(courseBody);
    this.courseService.addCourse(courseBody).subscribe(res => {
      this.router.navigateByUrl('/organization')
    });
  }

}
