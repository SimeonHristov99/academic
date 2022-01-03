import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from './Video';
import { CourseService } from '../services/course.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Course } from '../shared/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {


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
    private route: ActivatedRoute,
    private courseService: CourseService,
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
      duration: 1
    };

    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videos[0].link);

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id')

      if (!idParam) {
        console.log('ERROR: Invalid course id ')
        console.log(idParam)
        return
      }

      this.courseService.getCourses().subscribe(res => {
        const course = res.find(c => c._id === idParam)

        if (!course) {
          console.log('ERROR: Invalid course ')
          console.log(course)
          return
        }

        this.course = course
      })
    })
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
