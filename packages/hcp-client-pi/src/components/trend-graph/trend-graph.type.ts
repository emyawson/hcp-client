export type GraphTick = {
  label: string;
  value: number;
  color?: string;
};

export type DayTick = {
  value: number;
  label: string;
  isWeekend: boolean;
  drawLongTick: boolean;
};

export type MonthTick = {
  value: number;
  label: string;
  daysLeftInMonth: number;
};

export type TrendGraphAxesType = {
  width: number;
  height: number;
  verticalLabel: GraphTick[];
  verticalTicks: GraphTick[];
  horizontalDayTicks: DayTick[];
  horizontalMonthTicks: MonthTick[];
};

export type GraphFrameType = {
  width: number;
  height: number;
  yDirection?: number;
};

export type TrendGraphHorizontalAxisType = {
  width: number;
  height: number;
  horizontalDayTicks: DayTick[];
  horizontalMonthTicks: MonthTick[];
};

export type TrendGraphVerticalAxisType = {
  width: number;
  height: number;
  verticalLabel: GraphTick[];
  verticalTicks: GraphTick[];
};

export type TrendGraphType = {
  width: number;
  height: number;
  verticalTicks: GraphTick[];
  verticalLabel: GraphTick[];
  horizontalDayTicks: DayTick[];
  horizontalMonthTicks: MonthTick[];
};
