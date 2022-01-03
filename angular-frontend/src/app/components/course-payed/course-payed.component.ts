import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-course-payed',
  templateUrl: './course-payed.component.html',
  styleUrls: ['./course-payed.component.scss']
})
export class CoursePayedComponent implements OnInit {


  @Input()
  course: Course;

  loadedVideo: boolean = false;
  safeURL: any;
  name?: string;

  constructor(
    private _sanitizer: DomSanitizer
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
  }

  ngOnInit(): void {

  }

  onCheckboxChange(video: any, e: any) {
    video.watched = e.target.checked;
    this.changeIsVideoWatched();
  }


  loadVideo(video: any) {
    this.loadedVideo = true;
    this.name = video.week;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(video.link);
    this.changeIsVideoWatched();
  }

  loadDescription() {
    this.loadedVideo = false;
  }

  changeIsVideoWatched() {
    //TODO send to backend;
  }

  loadNewCourse() {
    //TODO load new course
  }

}
