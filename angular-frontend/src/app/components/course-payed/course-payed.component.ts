import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Course } from 'src/app/shared/course.model';
import { Video } from './Video';

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
  videos: Video[] = [
    { name: 'Intro to Psychology', link: 'https://www.youtube.com/embed/vo4pMVb0R6M', watched: false },
    { name: 'Psychological Research', link: 'https://www.youtube.com/embed/hFV71QPvX2I', watched: false },
    { name: 'The Chemical Mind', link: 'https://www.youtube.com/embed/W4N-7AlzK7s', watched: false },
    { name: 'Getting to Know Your Brain', link: 'https://www.youtube.com/embed/vHrmiy4W9C0', watched: false }
  ];


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

    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videos[0].link);

  }

  ngOnInit(): void {

  }

  onCheckboxChange(video: Video, e: any) {
    video.watched = e.target.checked;
    this.changeIsVideoWatched();
  }


  loadVideo(video: Video) {
    this.loadedVideo = true;
    this.name = video.name;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(video.link);
    video.watched = true;
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
