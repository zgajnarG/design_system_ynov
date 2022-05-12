export default interface DataChart {
  color: string;
  data : DataChartCoordonate[];
}

export interface DataChartCoordonate {
  x: number;
  y: number;
}
