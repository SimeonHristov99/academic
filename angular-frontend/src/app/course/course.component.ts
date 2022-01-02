import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from './Video';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
  safeURL: any;
  name?: string;
  videos: Video[] = [
    { name: 'Intro to Psychology', link: 'https://www.youtube.com/embed/vo4pMVb0R6M', watched: true },
    { name: 'Psychological Research', link: 'https://www.youtube.com/embed/hFV71QPvX2I', watched: false },
    { name: 'The Chemical Mind', link: 'https://www.youtube.com/embed/W4N-7AlzK7s', watched: false },
    { name: 'Getting to Know Your Brain', link: 'https://www.youtube.com/embed/vHrmiy4W9C0', watched: false }
  ];

  constructor(private _sanitizer: DomSanitizer) {
    //TODO load videos from backend;
    this.name = this.videos[0].name;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videos[0].link);
  }



  ngOnInit(): void {
  }

  onCheckboxChange(video: Video, e: any) {
    video.watched = e.target.checked;
    this.changeIsVideoWatched();

  }


  loadVideo(video: Video) {
    this.name = video.name;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(video.link);
    video.watched = true;
    this.changeIsVideoWatched();
  }

  changeIsVideoWatched() {
    //TODO send to backend;
  }


}
