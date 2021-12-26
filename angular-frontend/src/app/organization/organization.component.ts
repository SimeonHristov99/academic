import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  options: any;

  ngDoCheck(): void {
    console.log('doCheck');
  }

  ngOnInit() {
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
