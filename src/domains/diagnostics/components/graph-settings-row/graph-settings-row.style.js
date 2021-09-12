import styled from 'styled-components';
import { top, alignItems } from 'styled-system';

import { spacing, colors, fontSize } from 'src/domains/diagnostics/styles';

export const GraphSettingsRowContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const GraphSettingsWrapper = styled.div`
  padding: 0 ${spacing.four} 0;
  display: flex;
  justify-content: space-between;
  ${props =>
    props.absolutePosition
      ? `position: absolute;
        top: 6.625rem;
        right: 0;
        z-index: 1000;`
      : null};
  ${top};
  ${alignItems};
`;

export const LogbookSettingsRowContainerDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CardSectionTitleDiv = styled.div`
  font-size: ${fontSize.headline};
  text-transform: capitalize;
  color: ${colors.charcoal};
`;

export const ChangeTypeContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  z-index: 20;
`;

export const ChangeTypeButton = styled.button`
  background: ${props => (props.active && colors.blue) || colors.white};
  border: 1px solid ${colors.grayLight};
  border-radius: 0.3125rem;
  display: flex;
  height: 1.75rem;
  justify-content: center;
  outline: none;
  padding: ${spacing.one} ${spacing.three};
  width: 3.72rem;
`;

export const DateRangeContainerDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const DateRangeIconWrapperDiv = styled.div`
  padding-right: 0.625rem;
  padding-top: ${spacing.one};
`;

export const DateRangeTitleSpan = styled.span`
  color: ${colors.charcoal};
  padding-right: ${spacing.two};
`;
