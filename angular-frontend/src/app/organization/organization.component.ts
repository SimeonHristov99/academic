import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Greeting } from '../app.component';

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

  options: any;
  showEditModal: boolean[] = [false, false, false, false, false];
  showDeleteModal: boolean[] = [false, false, false, false, false];

  ngDoCheck(): void {
    console.log('doCheck');
  }

  ngOnInit() {
    this.headerData.emit(this.greeting);

    const data1 = [];
    const data2 = [];

    data1.push(6.0);
    data2.push(7.5);

    data1.push(10.0);
    data2.push(8.5);

    data1.push(50);
    data2.push(30);
    
    this.options = {
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
          data: data1
        },
        {
          name: 'Average',
          type: 'bar',
          barGap: 0,
          emphasis: {
            focus: 'series'
          },
          data: data2
        }
      ]
    };
  }

  editCourse(id: any) : void {
    console.log("Course: " + id + " editing");
  }

  deleteCourse(id: any) : void {
    console.log("Course: " + id + " deleting");
  }

}
