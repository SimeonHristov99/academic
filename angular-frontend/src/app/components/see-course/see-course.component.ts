import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
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
    private router: Router
  ) {
    this.course = new Course('NA', 'NA', 'Google', 'Beginner', 'https://www.google.com/', -1, -1, -1)
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

  buyCourse() {
    this.courseService.buyCourse(this.course.id)
  }

}
