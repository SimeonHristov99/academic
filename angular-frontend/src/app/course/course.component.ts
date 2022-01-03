import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from './Video';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
  payed: boolean = true;
  safeURL: any;
  name?: string;
  mainName: string = "Crash Course Psychology";
  videos: Video[] = [
    { name: 'Intro to Psychology', link: 'https://www.youtube.com/embed/vo4pMVb0R6M', watched: false },
    { name: 'Psychological Research', link: 'https://www.youtube.com/embed/hFV71QPvX2I', watched: false },
    { name: 'The Chemical Mind', link: 'https://www.youtube.com/embed/W4N-7AlzK7s', watched: false },
    { name: 'Getting to Know Your Brain', link: 'https://www.youtube.com/embed/vHrmiy4W9C0', watched: false }
  ];

  constructor(private courseService: CourseService, private _sanitizer: DomSanitizer) {
    //TODO load videos from backend;
    if(!this.payed) return;
    this.name = this.videos[0].name;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videos[0].link);
    this.videos[0].watched = true;
  }

  ngOnInit(): void {
  }

  onCheckboxChange(video: Video, e: any) {
    video.watched = e.target.checked;
    this.changeIsVideoWatched();
  }


  loadVideo(video: Video) {
    if(!this.payed) return;
    this.name = video.name;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(video.link);
    video.watched = true;
    this.changeIsVideoWatched();
  }

  changeIsVideoWatched() {
    //TODO send to backend;
  }


  getCoursesBought(): void {
    this.courseService.getCoursesByUser().subscribe(res => {
      console.log(res)
    })
  }
}
