import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { Content } from 'src/app/shared/content.model';
import { Course } from 'src/app/shared/course.model';

const EMBED_YT_URI: string = 'https://www.youtube.com/embed/'

@Component({
  selector: 'app-course-payed',
  templateUrl: './course-payed.component.html',
  styleUrls: ['./course-payed.component.scss']
})
export class CoursePayedComponent implements OnInit, OnDestroy {


  @Input()
  course: Course;
  content: Content;
  mark: number

  adCourse: Course;
  page = 0;
  safeURL: any;
  name?: string;
  rating: any = 1;

  subscriptions: Subscription[]

  constructor(
    private courseService: CourseService,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private userService: UserService
  ) {
    this.content = {
      _id: '',
      content: [{
        week: '',
        link: ''
      }]
    };

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
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.loadVideos();
    this.getCourse();
    this.setMark();
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
  }

  loadVideos() {
    this.subscriptions.push(
      this.courseService.content(this.course._id).subscribe(res => {
        this.content = res;
      })
    )
  }

  loadVideo(video: any) {
    this.page = 1;
    this.name = video.week;
    video.link = EMBED_YT_URI + video.link
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(video.link);
  }

  loadDescription() {
    this.page = 0;
  }

  finish() {
    this.page = 2;
  }

  send(link: string, rating: any) {
    if (link === '')
      return alert("Enter a link!")

    this.sendLink(link);
    this.setMark();
  }

  getCourse() {
    this.subscriptions.push(
      this.courseService.getCourses().subscribe(resAll => {

        this.subscriptions.push(
          this.courseService.getCoursesByUser().subscribe(resUser => {
            const n = Math.floor(Math.random() * resAll.length);
            this.adCourse = resAll[n];
            while (this.adCourse._id == this.course._id || resUser.some(e => e._id === this.adCourse._id)) {
              const n = Math.floor(Math.random() * resAll.length);
              this.adCourse = resAll[n];
            }
          })
        )
      })
    )
  }

  setMark() {
    this.subscriptions.push(
      this.courseService.getCoursesByUser().subscribe(res => {
        const course = res.find(c => c._id === this.course._id)
        this.mark = (course ? course.mark : -1)
      })
    )
  }

  sendLink(link: string) {
    this.subscriptions.push(
      this.userService.task(this.course._id, link).subscribe(res => {
        if (res) {
          alert("Link successfull send!");
        } else {
          alert("Error while sending!");
        }
      })
    )
  }
}
