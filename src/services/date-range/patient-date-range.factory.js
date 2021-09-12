import {
  DateRangeServiceImpl,
  DateRangeLoaderImpl,
} from './patient-date-range.service';
import { mockDateRangeData } from './patient-date-range.mock';

const mockLoader = q => Promise.resolve(mockDateRangeData);

export const DateRangeFactoryImpl = ({ devMode }) => {
  const loader = devMode ? mockLoader : DateRangeLoaderImpl;
  return DateRangeServiceImpl(loader);
};
