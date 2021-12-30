import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  students: User[] = [];

  constructor(private courseService: CourseService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(): void {
    this.students = this.courseService.getStudentListByCourse();
  }

}
