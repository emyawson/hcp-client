type ShapeStyle = {
  strokeColor: string,
  fillColor?: string,
};

type Shape = {
  type: string,
  style: ShapeStyle,
};

export type Mark = {
  x: number,
  y: number,
  unit?: string,
  aboveTargetRange?: boolean,
  belowTargetRange?: boolean,
  afterMeal?: boolean,
  beforeMeal?: boolean,
  date?: Date,
  shape: Shape,
  glucoseValue?: number,
  customComponent?: any,
};
