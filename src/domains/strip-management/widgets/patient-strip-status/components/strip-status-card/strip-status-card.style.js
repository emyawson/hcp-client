import styled from 'styled-components';

import { breakpoints, fontSize, spacing } from 'src/core';
import { combineRems } from 'src/utils';

export const StripStatusCardContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: ${spacing.three};

  @media all and (min-width: ${breakpoints.medium}) {
    margin: ${combineRems(spacing.one, spacing.three)};
  }
  @media all and (min-width: ${breakpoints.large}) {
    margin: ${spacing.four};
  }
`;
export const StripStatusCardLineItem = styled.div`
  flex-basis: 100%;
  text-align: center;
  padding-bottom: ${spacing.two};
  text-align: left;
`;

export const StripStatusTrafficLight = styled.div`
  flex-basis: 30%;
  position: relative;
  margin-bottom: ${spacing.three};
`;

// Just an empty div, used as wrapper to hold the strip text items
export const StripStatusCardLineItemWrapper = styled.div`
  margin-bottom: ${props =>
    props.cardHasButtons ? `${spacing.three}` : `${spacing.one}`};
`;

export const StripStatusCardButtonsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spacing.three} 0 0;
  width: 100%;

  button {
    font-size: ${fontSize.caption};
    margin: 0 ${spacing.one} ${spacing.two};
    min-width: auto;
    padding-left: 0;
    padding-right: 0;
    width: calc(50% - ${spacing.two});

    @media all and (min-width: ${breakpoints.large}) {
      font-size: ${fontSize.p};
      padding-left: ${spacing.four};
      padding-right: ${spacing.four};
      width: auto;
    }
  }
`;
