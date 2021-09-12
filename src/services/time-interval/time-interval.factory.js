import {
  TimeIntervalServiceImpl,
  TimeIntervalLoaderImpl,
  TimeIntervalTransformImpl,
} from './time-interval.service';
import { mockTimeIntervals } from './time-interval.mock';

const mockLoader = q => Promise.resolve(mockTimeIntervals);

export const TimeIntervalFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : TimeIntervalLoaderImpl;
  return TimeIntervalServiceImpl(loader, TimeIntervalTransformImpl);
};
