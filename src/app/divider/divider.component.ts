import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class DividerComponent implements OnInit {
  @Input() height: string = '1px';
  @Input() width: string = '256px';
  @Input() color: string = '#696969';

  constructor() {}

  ngOnInit(): void {}
}
