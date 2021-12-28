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

  ngDoCheck(): void {
    console.log('doCheck');
  }

  ngOnInit() {
    this.headerData.emit(this.greeting);

    const data1 = [];
    const data2 = [];
    const data3 = [];

    data1.push(10.0);
    data2.push(20);
    data3.push(6.0);

    this.options = {
      tooltip: {
        confine: true
      },
      xAxis: {},
      yAxis: {},
      series: [
        {
          type: 'bar',
          barCategoryGap: '0%',
          data: data1
        },
        {
          type: 'bar',
          barCategoryGap: '0%',
          data: data2
        },
        {
          type: 'bar',
          barCategoryGap: '0%',
          data: data3
        }
      ]
    };
  }

}
