import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { CourseService } from 'src/app/services/course.service';
import { Greeting } from '../../app.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  greeting: Greeting = {
    header: 'Hello, Google',
    context: '10:00, 17 May 2022'
  };

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  options: any = [];
  showEditModal: boolean[] = [];
  showDeleteModal: boolean[] = [];

  courses: Course[] = [];

  updateCourseBody: Course = {
    title: '',
    description: '',
    price: 1.0,
    raiting: 0.0,
    duration: 1
  };

  constructor(private courseService: CourseService, private http: HttpClient) {

  }

  ngDoCheck(): void {
    console.log('doCheck');
  }

  ngOnInit() {
    this.headerData.emit(this.greeting);
    this.getCourseList();
    this.closeModals();
  }

  getCourseList(): void {
    this.courses = this.courseService.getCourseList();
    this.buildGraphics();
    console.log(this.courses);
  }

  getAverage(): number[] {
    let i = 0, raiting = 0, people = 0, price = 0;
    let result: number[] = [];

    for(i = 0; i < this.courses.length; i++){
      raiting = raiting + this.courses[i].raiting;
      price = price + this.courses[i].price;
    }

    result[0] = raiting / i;
    result[1] = price / i;

    return result;
  }

  buildGraphics(): void {
    const data1: number[][] = [[]];
    const data2: number[][] = [[]];
    const average_val = this.getAverage();

    data1.push([]);
    data1.push([]);

    data2.push([]);
    data2.push([]);

    for(let i = 0; i < this.courses.length; i++){
      data1[i][0] = this.courses[i].raiting;
      data1[i][1] = this.courses[i].price;
      data1[i][2] = 50;

      data2[i][0] = average_val[0];
      data2[i][1] = average_val[1];
      data2[i][2] = 30;

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

  closeModals(): void {
    for(let i = 0; i < this.courses.length; i++){
      this.showEditModal[i] = false;
      this.showDeleteModal[i] = false;
    }
  }

  editCourse(id: any): void {
    console.log(JSON.stringify(this.updateCourseBody));
  }

  deleteCourse(id: any): void {
    console.log("Course: " + id + " deleting");
  }

}
