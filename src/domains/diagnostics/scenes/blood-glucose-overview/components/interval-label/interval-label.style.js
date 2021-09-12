import styled from 'styled-components';

import { colors, spacing } from 'src/domains/diagnostics/styles';

export const IntervalLabelContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${colors.blueMarine};
  margin: ${spacing.three} 0
    ${props => (props.smallButtonMargin ? spacing.three : '1.5rem')};
  height: ${spacing.seven};
  justify-content: center;
`;

export const IntervalLabelList = styled.div`
  text-align: left;
  padding: 0;
`;

export const IntervalBottomLabel = styled.div`
  padding: 0.5rem 0 0;
  font-size: 14px;
  text-align: left;
`;

export const IntervalTopLabel = styled.div`
  position: relative;
  display: flex;
  font-weight: bold;
  flex-direction: row;
  border-bottom: ${props =>
    props.underline ? `0.0625rem solid ${colors.blueMarine}` : 'none'};
  padding: 0.5rem;
  padding-right: ${props => (props.smallLeftMargin ? '0.75rem' : '0.5rem')};
  justify-content: center;
`;

export const IntervalInfoContainer = styled.div`
  position: absolute;
  right: -5px;
  top: 3px;
`;
