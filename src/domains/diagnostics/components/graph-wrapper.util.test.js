import { reject } from 'ramda';

import {
  GRAPH_CONTAINER_MIN_HEIGHT,
  GRAPHS,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';

import {
  getGridSizeRuleForGraphContainer,
  getGraphNameFromUrl,
} from './graph-wrapper.util';

describe('getGridSizeRuleForGraphContainer test suite ', () => {
  it("Should return 'min-content' for insulin and BG stats", () => {
    expect(
      getGridSizeRuleForGraphContainer(GRAPHS.BLOOD_GLUCOSE_GENERAL_STATS),
    ).toBe('min-content');
    expect(getGridSizeRuleForGraphContainer(GRAPHS.INSULIN)).toBe(
      'min-content',
    );
  });
  it('Should return minmax(GRAPH_CONTAINER_MIN_HEIGHT, 100%) for all other graphs', () => {
    const flexibleHeightGraphs = reject(
      GRAPH =>
        GRAPH === GRAPHS.BLOOD_GLUCOSE_GENERAL_STATS ||
        GRAPH === GRAPHS.INSULIN,
      Object.keys(GRAPHS),
    );
    flexibleHeightGraphs.forEach(GRAPH => {
      expect(getGridSizeRuleForGraphContainer(GRAPH)).toBe(
        `minmax(${GRAPH_CONTAINER_MIN_HEIGHT}, 100%)`,
      );
    });
  });
});

describe('getGraphNameFromUrl test suite ', () => {
  it('Should correctly get graph name from full url', () => {
    const graphUrl = 'patients/123/graph';
    const standardDayUrl = `${graphUrl}/standard-day`;
    const bgStatsAllUrl = `${graphUrl}/blood-glucose-general-stats/all`;

    expect(getGraphNameFromUrl(standardDayUrl, graphUrl)).toBe('standard-day');
    expect(getGraphNameFromUrl(bgStatsAllUrl, graphUrl)).toBe(
      'blood-glucose-general-stats',
    );
  });
});
