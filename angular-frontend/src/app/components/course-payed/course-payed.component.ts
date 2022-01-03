import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-course-payed',
  templateUrl: './course-payed.component.html',
  styleUrls: ['./course-payed.component.scss']
})
export class CoursePayedComponent implements OnInit {


  @Input()
  course: Course;
  mark: number

  adCourse: Course;
  page = 0;
  safeURL: any;
  name?: string;
  rating: any = 1;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private userService: UserService
  ) {
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

    this.adCourse = {
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

    this.mark = -1
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getCourse();
    this.setMark()
  }

  onCheckboxChange(video: any, e: any) {
    video.watched = e.target.checked;
    this.changeIsVideoWatched();
  }


  loadVideo(video: any) {
    this.page = 1;
    this.name = video.week;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(video.link);
    this.changeIsVideoWatched();
  }

  loadDescription() {
    this.page = 0;
  }

  changeIsVideoWatched() {
    //TODO send to backend;
  }

  finish() {
    this.page = 2;
  }

  send(link: string, rating: any) {
    if (link === '')
      return alert("Enter a link!")

    this.userService.task(this.course._id, link).subscribe(res => {
      if (res) {
        alert("Successfull send!");
      } else {
        alert("Error while sending!");
      }
    })
  }

  getCourse() {
    this.courseService.getCourses().subscribe(res => {
      const n = Math.floor(Math.random() * res.length);
      this.adCourse = res[n];
      while (this.adCourse._id == this.course._id) {
        this.adCourse = res[n];
      }
    })

    console.log(this.course.content)
  }
  
  setMark() {
    this.courseService.getCoursesByUser().subscribe(res => {
      const course = res.find(c => c._id === this.course._id)

      this.mark = (course ? course.mark : -1)
    })
  }
}
