import { Component } from '@angular/core';
import DataChart from './models/data-chart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'design_system';

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
  }];
}
