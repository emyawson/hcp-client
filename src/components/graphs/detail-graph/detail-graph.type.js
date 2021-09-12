import {
  AreaData,
  LineData,
  MarksData,
  MeanLineData,
  ThresholdData,
} from '../graphs.type';

export type DetailGraphData = {
  area: AreaData,
  bars?: LineData,
  lines: LineData,
  marks: MarksData,
  meanLine: MeanLineData,
  meanMarks: MarksData,
  threshold: ThresholdData,
};
