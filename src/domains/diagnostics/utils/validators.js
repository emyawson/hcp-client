import { isEmpty, isNil, is } from 'ramda';

export const validateDeviceStats = (metricGroup, metric, stats, fixTo) =>
  !isEmpty(stats)
    ? !isNil(stats[metricGroup][metric]) &&
      is(Number, Number(stats[metricGroup][metric]))
      ? fixTo === 0
        ? Math.round(stats[metricGroup][metric])
        : stats[metricGroup][metric]
      : '-'
    : '-';

export const validateDeviceInfo = data => (!isEmpty(data) ? data : '-');
