import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../shared/course.model';

@Component({
  selector: 'app-course-tile',
  templateUrl: './course-tile.component.html',
  styleUrls: ['./course-tile.component.scss']
})
export class CourseTileComponent implements OnInit {

  @Input() course: Course

  constructor() {
    this.course = new Course('NA', 'NA', 'Google', 'Beginner', 'https://www.google.com/', -1, -1, -1)
  }

  ngOnInit(): void {
  }

}
