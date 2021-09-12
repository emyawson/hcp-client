import styled from 'styled-components';

import { Button } from 'src/components';
import { spacing, fontSize, colors } from 'src/core/styles';
import { combineRems } from 'src/utils';

export const DeleteCustomGuideModalBodyDiv = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.five};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const DeleteCustomGuideIconWrapperDiv = styled.div`
  padding-bottom: ${spacing.three};
`;

export const DeleteCustomGuideSubheading = styled.h2`
  font-size: ${fontSize.headline};
  color: ${colors.grayDark};
  margin-bottom: ${spacing.three};
`;

export const DeleteCustomGuideInfoWrapperDiv = styled.div`
  color: ${colors.grayDark};
  font-size: ${fontSize.p};
  max-width: 30rem;
  border-bottom: 1px solid ${colors.grayLight};
  margin-bottom: ${combineRems(spacing.three, spacing.four)};
  & li {
    padding-bottom: ${spacing.three};
    line-height: 1.35rem;
  }
`;

export const DeleteCustomGuideButtonsWrapperDiv = styled.div`
  display: flex;
  & button {
    margin: 0 ${spacing.three};
  }
`;

export const CancelDeleteGuideButton = styled(Button)`
  &:hover {
    border-color: ${colors.brandBlue};
    color: ${colors.brandBlue};
  }
`;
