import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { Course } from 'src/app/shared/course.model';
import { User } from 'src/app/shared/user.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  id: any;
  students: User[] = [];
  studentMark: number = 1;
  course: Course = {
    _id: '',
    rating: 0,
    title: '',
    description: '',
    organization: '',
    level: 'beginner',
    price: 1,
    duration: 1,
    content: [{
      week: '',
      link: ''
    }]
  };

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('courseId');
    this.getStudentList();
  }

  getStudentList(): void {
    this.course._id = this.id;
    this.userService.getUsersByCourse(this.course).subscribe(res => {
      console.log(res);
      this.students = res;
    });
  }

  submitMark(id: any): void {
    let body = {
      userId: this.students[id].id,
      courseId: this.id,
      mark: this.studentMark
    };
    this.userService.submitStudentMark(body).subscribe(res => {
    });
    console.log(this.studentMark);
  }

}
