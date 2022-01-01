import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  students: User[] = [];
  studentMark: number = 1;

  constructor(private courseService: CourseService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(): void {
    // this.students = this.courseService.getStudentListByCourse();
  }

  submitMark(id: any): void {
    console.log(this.studentMark);
  }

  submitMark(id: any): void {
    console.log(this.studentMark);
  }

}
