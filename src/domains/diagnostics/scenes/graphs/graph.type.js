import {
  GRAPH_STANDARD_DAY,
  GRAPH_STANDARD_WEEK,
  GRAPH_LOGBOOK,
  GRAPH_TYPE_DETAILS,
  GRAPH_TYPE_TREND,
  LOGBOOK_TYPE_DIARY,
  LOGBOOK_TYPE_STATS,
  LOGBOOK_TYPE_DETAILS,
} from './graph.constants';

export type Graph = GRAPH_STANDARD_DAY | GRAPH_STANDARD_WEEK | GRAPH_LOGBOOK;
export type GraphStartTime = '0:00' | '6:00' | '12:00' | '18:00';
export type GraphType = GRAPH_TYPE_DETAILS | GRAPH_TYPE_TREND;
export type LogbookType =
  | LOGBOOK_TYPE_DIARY
  | LOGBOOK_TYPE_STATS
  | LOGBOOK_TYPE_DETAILS;
export type DateRange = { start: string, end: string };
