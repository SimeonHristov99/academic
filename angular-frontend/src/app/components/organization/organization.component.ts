import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { Course } from 'src/app/shared/course.model';
import { Greeting } from '../../app.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  greeting: Greeting
  date: Date = new Date();

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  options: any = [];
  showEditModal: boolean[] = [];
  showDeleteModal: boolean[] = [];

  courses: Course[] = [];
  people: number[] = [];
 
  updateCourseBody: Course = {
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

  constructor(private courseService: CourseService, private userService: UserService) {
    this.greeting = {
      header: `Hello, ${localStorage.getItem('firstName')}`,
      context: '' + this.date
    }
  }

  ngDoCheck(): void {
    console.log('doCheck');
  }

  ngOnInit() {
    this.headerData.emit(this.greeting);
    this.getCourses();
    this.closeModals();
  }

  getCourses(): void {
    this.courseService.getCoursesByUser().subscribe(res => {
      this.courses = res;
      for(let i = 0; i < this.courses.length; i++){
        this.getStudentList(this.courses[i], i);
      }
    });
  }

  getStudentList(course: Course, index: number): void {
    this.userService.getUsersByCourse(course).subscribe(res => {
      this.people[index] = res.length;
      this.buildGraphics();
    });;
  }

  getAverage(): number[] {
    let i = 0, raiting = 0, people = 0, price = 0;
    let result: number[] = [];

    for (i = 0; i < this.courses.length; i++) {
      raiting = raiting + this.courses[i].rating;
      price = price + this.courses[i].price;
      people = people + this.people[i];
    }

    result[0] = raiting / i;
    result[1] = price / i;
    result[2] = people / i;

    return result;
  }

  buildGraphics(): void {
    const data1: number[][] = [[]];
    const data2: number[][] = [[]];
    const average_val = this.getAverage();

    for (let i = 0; i < this.courses.length; i++) {
      data1.push([]);
      data2.push([]);

      data1[i][0] = this.courses[i].rating;
      data1[i][1] = this.courses[i].price;
      data1[i][2] = this.people[i];

      data2[i][0] = average_val[0];
      data2[i][1] = average_val[1];
      data2[i][2] = average_val[2];

      this.options[i] = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Current', 'Average'],
          textStyle: {
            color: 'white'
          }
        },
        xAxis: [{
          type: 'category',
          axisTick: { show: false },
          data: ['Rating', 'Price', 'People'],
          axisLine: {
            show: true,
            lineStyle: {
              color: 'white'
            }
          },
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: 'white'
            }
          }
        }],
        series: [
          {
            name: 'Current',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: data1[i]
          },
          {
            name: 'Average',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: data2[i]
          }
        ]
      }
    }
  }

  addField(){
    let content = [];
    for(let i = 0; i < this.updateCourseBody.duration; i++) {
        if(i < this.updateCourseBody.content.length) {
          content.push(this.updateCourseBody.content[i]);
        } else {
          content.push({
            week: '',
            link: ''
          });
        }
    }
    while (this.updateCourseBody.content.length > 0) {
      this.updateCourseBody.content.pop();
    }
    for (let i = 0; i < content.length; i++) {
      this.updateCourseBody.content.push(content[i]);
    }
  }

  closeModals(): void {
    for (let i = 0; i < this.courses.length; i++) {
      this.showEditModal[i] = false;
      this.showDeleteModal[i] = false;
    }
  }

  editCourse(id: any): void {
    this.updateCourseBody._id = id;
    console.log(this.updateCourseBody)
    this.courseService.updateCourse(this.updateCourseBody).subscribe(res => {
    });
  }

  deleteCourse(id: any): void {
    console.log(this.courses[id])
    this.courseService.deleteCourse(this.courses[id]).subscribe(res => {
    });
  }

}
