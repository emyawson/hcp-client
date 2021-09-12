export type Point = {
  x: number,
  y: number,
};

export type Area = {
  x: number,
  y: number,
  y0: number,
};

export type ShapeStyle = {
  strokeColor: string,
  fillColor?: string,
};

export type Shape = {
  type: string,
  style: ShapeStyle,
};

export type MarksData = {
  data: Array<Array<Mark>>,
};

export type ThresholdData = {
  color: string,
  data: Array<Point[]>,
};

export type AreaData = {
  color: string,
  data: Array<Area[]>,
};

export type LineData = {
  color: string,
  data: Array<Point[]>,
};

export type MeanLineData = LineData & {
  strokeWidth: number,
};

export type MealTimeVisualCuePointValues = Array<Array<Area[]>>;
