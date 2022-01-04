import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { Course } from 'src/app/shared/course.model';
import { User } from 'src/app/shared/user.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit, OnDestroy {

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
    mark: 0,
    duration: 1,
    content: [{
      week: '',
      link: ''
    }]
  }

  subscriptions: Subscription[]

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('courseId');
    this.getStudentList();
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
  }

  getStudentList(): void {
    this.course._id = this.id;
    this.subscriptions.push(
      this.userService.getUsersByCourse(this.course).subscribe(res => {
        console.log(res);
        this.students = res;
      })
    )
  }

  submitMark(id: any): void {
    let body = {
      userId: this.students[id].id,
      courseId: this.id,
      mark: this.studentMark
    }

    this.subscriptions.push(
      this.userService.submitStudentMark(body).subscribe(res => {
      })
    )

    console.log(this.studentMark);
  }

}
