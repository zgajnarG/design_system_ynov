import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartComponent } from './components/chart/chart.component';
import DataChart from './models/data-chart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'design_system';

  @ViewChild(ChartComponent) canvas: ChartComponent| undefined;

  data : DataChart[]=[{
    color : "red",
    data: [
      {
        x: 0,
        y: 0
      }, {
          x: 20,
          y: 10
      }, {
          x: 40,
          y: 15
      }, {
          x: 60,
          y: 40
      }, {
          x: 80,
          y: 60
      }, {
          x: 100,
          y: 50
      }, {
          x: 120,
          y: 85
      }, {
          x: 140,
          y: 100
      }
    ]
  },
  {
    color : "blue",
    data: [
      {
        x: 0,
        y: 0
      }, {
          x: 20,
          y: 20
      }, {
          x: 40,
          y: 30
      }, {
          x: 60,
          y: 40
      }, {
          x: 80,
          y: 80
      }, {
          x: 100,
          y: 85
      }, {
          x: 120,
          y: 85
      }, {
          x: 140,
          y: 90
      }
    ]
  }
];

refesh(){
  this.data = [this.data[0]];
}
}
