import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import DataChart from 'src/app/models/data-chart';

@Component({
  selector: 'ynov-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {

  @ViewChild('myCanvas', {static: false}) canvas: ElementRef | undefined;
  @Input() minX: number = 0;
  @Input() minY: number = 0;
  @Input() maxX: number = 140;
  @Input() maxY: number = 100;
  @Input() unitsPerTickX: number = 10;
  @Input() unitsPerTickY: number =10;
  @Input() data : DataChart[] =[];

  public context: CanvasRenderingContext2D | undefined;

  scaleX = 0;
  scaleY = 0;
  pointRadius = 5;
  x= 0;
  y = 0;
  height = 0;

  constructor() { }

  ngAfterViewInit(): void {
    this.create();
  }

  private LineChart(con :any) {
    // user defined properties
    const minX = con.minX;
    const minY = con.minY;
    const maxX = con.maxX;
    const maxY = con.maxY;
    const unitsPerTickX = con.unitsPerTickX;
    const unitsPerTickY = con.unitsPerTickY;

    // constants
    const padding = 10;
    const tickSize = 10;
    const axisColor = "#555";
    const font = "13pt Helvetica ";

    const fontHeight = 12;

    // relationships
    this.context = this.canvas?.nativeElement.getContext("2d");
    const canvas = this.canvas as ElementRef;
    const rangeX = maxX - minY;
    const rangeY = maxY - minY;
    const numXTicks = Math.round(rangeX / unitsPerTickX);
    const numYTicks = Math.round(rangeY / unitsPerTickY);
    this.x = this.getLongestValueWidth({numYTicks, unitsPerTickY , maxY , font}) + padding * 2;
    this.y = padding * 2;
    const width = canvas.nativeElement.width - this.x - padding * 2;
    this.height = canvas.nativeElement.height - this.y - padding - fontHeight;
    this.scaleX = width / rangeX;
    this.scaleY = this.height / rangeY;

    // draw x y axis and tick marks
    this.drawXAxis( {   axisColor , width , numXTicks , tickSize, font , maxX , padding});
    this.drawYAxis( { axisColor , numYTicks ,tickSize, font , maxY , padding});
}

  private getLongestValueWidth( data :any) {
    const context = this.context as CanvasRenderingContext2D;
    context.font = data.font;
      let longestValueWidth = 0;
      for (let n = 0; n <= data.numYTicks; n++) {
          const value = data.maxY - (n * data.unitsPerTickY);
          longestValueWidth = Math.max(longestValueWidth, context.measureText(value.toString()).width);
      }
      return longestValueWidth;
  };

  private drawXAxis( data :any ) {
      const context = this.context as CanvasRenderingContext2D;
      const height = this.height ? this.height : 0;
      context.save();
      context.beginPath();
      context.moveTo(this.x, this.y + height);
      context.lineTo(this.x + data.width, this.y + height);
      context.strokeStyle = data.axisColor;
      context.lineWidth = 2;
      context.stroke();

      // draw tick marks
      for (let n = 0; n < data.numXTicks; n++) {
          context.beginPath();
          context.moveTo((n + 1) * data.width / data.numXTicks + this.x, this.y +height);
          context.lineTo((n + 1) * data.width / data.numXTicks + this.x, this.y + height - data.tickSize);
          context.stroke();
      }

      // draw labels
      context.font = data.font;
      context.fillStyle = "black";
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let n = 0; n < data.numXTicks; n++) {
          const label = Math.round((n + 1) * data.maxX / data.numXTicks);
          context.save();
          context.translate((n + 1) * data.width / data.numXTicks + this.x, this.y + height + data.padding);
          context.fillText(label.toString(), 0, 0);
          context.restore();
      }
      context.restore();
  };

  private drawYAxis ( data :any ) {
      const context = this.context as CanvasRenderingContext2D;
      const height = this.height ? this.height : 0;
      context.save();
      context.save();
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.x, this.y + height);
      context.strokeStyle = data.axisColor;
      context.lineWidth = 2;
      context.stroke();
      context.restore();

      // draw tick marks
      for (let n = 0; n < data.numYTicks; n++) {
          context.beginPath();
          context.moveTo(this.x, n * height / data.numYTicks + this.y);
          context.lineTo(this.x + data.tickSize, n * height / data.numYTicks + this.y);
          context.stroke();
      }

      // draw values
      context.font = data.font;
      context.fillStyle = "black";
      context.textAlign = "right";
      context.textBaseline = "middle";

      for (let n = 0; n < data.numYTicks; n++) {
          const value = Math.round(data.maxY - n * data.maxY / data.numYTicks);
          context.save();
          context.translate(this.x - data.padding, n * height / data.numYTicks + this.y);
          context.fillText(value.toString(), 0, 0);
          context.restore();
      }
      context.restore();
  };

  private drawLine(data : any , color : string , width : number) {
      const context = this.context as CanvasRenderingContext2D;
      context.save();
      this.transformContext();
      context.lineWidth = width;
      context.strokeStyle = color;
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(data[0].x * this.scaleX, data[0].y * this.scaleY);

      for (let n = 0; n < data.length; n++) {
          const point = data[n];

          // draw segment
          context.lineTo(point.x * this.scaleX, point.y * this.scaleY);
          context.stroke();
          context.closePath();
          context.beginPath();
          context.arc(point.x * this.scaleX, point.y * this.scaleY, this.pointRadius, 0, 2 * Math.PI, false);
          context.fill();
          context.closePath();

          // position for next segment
          context.beginPath();
          context.moveTo(point.x * this.scaleX, point.y * this.scaleY);
      }
      context.restore();
  };

  transformContext() {
    const context = this.context as CanvasRenderingContext2D;
    const height = this.height ? this.height : 0;
    context.translate(this.x, this.y + height);
    context.scale(1, -1);
  };

  create(){
    this.LineChart({
      minX: this.minX,
      minY: this.minY,
      maxX: this.maxX,
      maxY: this.maxY,
      unitsPerTickX: this.unitsPerTickX,
      unitsPerTickY: this.unitsPerTickY
   });
   for(let i = 0; i < this.data.length; i++){
    this.drawLine(this.data[i].data, this.data[i].color, 3);
   }
  }
  clear() {
    this.context?.clearRect(0, 0, this.canvas?.nativeElement.width, this.canvas?.nativeElement.height);
  }

}

