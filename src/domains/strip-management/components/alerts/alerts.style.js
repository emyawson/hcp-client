import styled from 'styled-components';

import { borderRadius, colors, fontSize, spacing } from 'src/core';
import {
  GridContainer,
  GridItemWithoutPadding,
  P,
  weight,
  ControlText,
} from 'src/components';
import { combineRems, convertPxToRem } from 'src/utils';

export const thresholdMaxWidth = convertPxToRem(230);

export const FlexWrapDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const AlertsWrapperDiv = styled.div`
  padding-top: ${spacing.three};
`;

// Allow alerts header and save section to auto size
// with three equal-sized threshold rows in between
export const AlertsGridContainer = GridContainer.extend`
  margin: 0 auto ${combineRems(spacing.three, spacing.four)};

  @supports (display: grid) {
    grid-template-rows: auto repeat(3, 1fr) auto;
  }
`;

// Ensure grid child nodes match height of neighbouring grids
// Specify width to prevent flex wrapping weirdness in IE11
export const AlertsGridRow = GridItemWithoutPadding.extend`
  padding: 0;
  & > div {
    height: 100%;
    width: 100%;
  }
`;

// Duplicate padding declaration is currently required
// To overwrite our base GridContainer styles for grid-supported browsers
export const AlertsInternalGrid = GridContainer.extend`
  justify-content: flex-start;
  padding: 0 ${spacing.four};

  & > div:nth-child(-n + 3) {
    max-width: ${thresholdMaxWidth};
  }

  & > div:nth-child(4) {
    max-width: 100%;
  }

  @supports (display: grid) {
    grid-template-columns: repeat(3, minmax(auto, ${thresholdMaxWidth})) 1fr;
    padding: 0 ${spacing.four};
  }
`;

export const AlertsPageHeader = styled.header`
  background-color: ${colors.blueMarineAlpha5};
  border-radius: ${borderRadius.three};
  padding: ${combineRems(spacing.two, spacing.three)} 0;
`;

export const AlertsHeaderTitleP = P.extend`
  color: ${colors.blueMarine};
  font-weight: ${weight.bold};
  margin: 0;
  text-transform: uppercase;
`;

export const AlertsIntervalGrid = AlertsInternalGrid.extend`
  border-bottom: 1px solid ${colors.silverDark};
  padding-bottom: ${spacing.four};

  @supports (display: grid) {
    padding-bottom: ${spacing.four};
  }
`;

export const IntervalValueLabel = styled.label`
  color: ${colors.black};
  display: block;
  font-size: ${fontSize.p};
  font-weight: ${weight.semiBold};
  margin-bottom: ${spacing.three};
  width: 100%;
`;

export const IntervalValueInput = styled(ControlText)`
  background: transparent;
  border: 0;
  outline: 0;
  color: ${colors.grayMedium};
  font-size: ${fontSize.p};
  padding: 0;
  width: 100%;
`;

export const AlertsSaveRowDiv = FlexWrapDiv.extend`
  justify-content: flex-end;
  padding: ${spacing.three} ${spacing.four} 0;
`;
