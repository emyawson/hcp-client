import styled from 'styled-components';
import { flex } from 'styled-system';

import { spacing, colors, fontSize } from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';

export const DetailBlockContainerDiv = styled.div`
  ${flex};
  display: flex;
  align-items: flex-start;
  margin: 0 ${spacing.four};
`;

export const PrimaryTitleHeader = styled.h4`
  color: ${colors.grayMedium};
  text-transform: uppercase;
  font-weight: ${weight.light};
`;

export const SecondaryTitleHeader = styled.h4`
  color: ${colors.charcoal};
  font-weight: ${weight.light};
`;

export const CircleDiv = styled.div`
  height: ${spacing.three};
  min-width: ${spacing.three};
  border-radius: ${spacing.two};
  background-color: ${props => props.color};
  margin-right: ${spacing.two};
`;
CircleDiv.displayName = 'CircleDiv';

export const ValueContainerDiv = styled.div`
  flex: 1 1 auto;
  flex-direction: row;
  display: flex;
  border-bottom: 1px solid ${colors.grayLighter};
  align-items: center;
  white-space: nowrap;
  padding: 0 0 ${spacing.two};
`;
ValueContainerDiv.displayName = 'ValueContainerDiv';

export const ValueDisplay = styled.div`
  font-size: ${fontSize.display1};
`;
