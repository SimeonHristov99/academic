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
      duration: 1,
      content: [{
        week: '',
        link: ''
      }]
    };
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getCourse();
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

    this.sendLink(link);
    this.sendRating(rating);
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


  sendLink(link: string) {
    this.userService.task(this.course._id, link).subscribe(res => {
      if (res) {
        alert("Link successfull send!");
      } else {
        alert("Error while sending!");
      }
    })
  }

  sendRating(rating: any) {
    throw new Error('Method not implemented.');
  }
}
