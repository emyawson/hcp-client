import styled from 'styled-components';

import { spacing, colors } from 'src/core';
import { Headline, Title } from 'src/components';
import { combineRems } from 'src/utils';

const stripStatusContentRhythm = combineRems(spacing.three, spacing.four);
export const CenteredFlexRowDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const CenteredFlexRowWithMarginDiv = CenteredFlexRowDiv.extend`
  margin-bottom: ${stripStatusContentRhythm};
`;

// Container to wrap loading indicator or the content that replaces it
export const StripStatusLoadableContentDiv = styled.div``;

export const StripStatusContentWrapperDiv = styled.div`
  padding: ${spacing.three} 0;
  text-align: center;
`;

export const StripStatusHeadlinesDiv = styled.div`
  margin-bottom: ${spacing.four};
`;

export const StripStatusHeadline = Headline.extend`
  margin-bottom: ${spacing.three};
`;

export const StripStatusCardLineItemDiv = styled.div`
  text-align: left;
`;

export const StripStatusCardLineItemTitle = Title.extend`
  margin-bottom: ${spacing.two};
`;

export const StripStatusSmallCardSeparatorDiv = styled.div`
  border-left: 1px solid ${colors.grayLight};
  display: inline-flex;
  margin: 0 ${spacing.three};
`;

export const StripStatusButtonsDiv = CenteredFlexRowDiv.extend`
  flex-wrap: wrap;
  margin: ${stripStatusContentRhythm} auto ${spacing.three};

  button {
    margin: 0 ${spacing.three} ${spacing.three};
  }
`;

export const InnerWrapperDiv = styled.div`
  width: 100%;
`;
