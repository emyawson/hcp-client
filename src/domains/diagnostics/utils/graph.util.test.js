import { colors } from 'src/domains/diagnostics/styles';

import { addEmptyFillerRadialSegmentWhenValuesZero } from './graphs.util';

describe('addEmptyFillerRadialSegmentWhenValuesZero util', () => {
  const segmentsWithValues = [
    {
      name: 'segment1',
      value: 0.25,
      fill: colors.blueMarine,
    },
    {
      name: 'segment2',
      value: 0.75,
      fill: colors.basalBlue,
    },
    {
      name: 'segment3',
      value: 0,
      fill: colors.red,
    },
  ];

  const segmentsWithZeroValues = segmentsWithValues.map(segment => ({
    ...segment,
    value: 0,
  }));

  const emptyFillerSegment = {
    name: 'empty-filler',
    fill: colors.gray,
    value: 100,
  };

  it('should add empty filler segment when existing segment values are zero', () => {
    expect(
      addEmptyFillerRadialSegmentWhenValuesZero(segmentsWithZeroValues),
    ).toEqual([...segmentsWithZeroValues, emptyFillerSegment]);

    expect(
      addEmptyFillerRadialSegmentWhenValuesZero(segmentsWithValues),
    ).toEqual([...segmentsWithValues]);
  });
});
