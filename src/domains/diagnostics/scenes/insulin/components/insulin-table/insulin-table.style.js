import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 0.0625rem solid ${props => props.theme.colors.grayLighter};
`;

Row.displayName = 'Row';

export const RowNoBorder = styled(Row)`
  border: none;
`;

RowNoBorder.displayName = 'RowNoBorder';

export const HeaderRow = styled(Row)`
  background-color: ${props => props.theme.colors.blueMarineAlpha5};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.brandBlue};
  border-bottom: none;
`;

HeaderRow.displayName = 'HeaderRow';

export const Column = styled.div`
  flex: ${props => (props.flex ? props.flex : 1)};
  padding: ${props => props.theme.spacing.three};
  text-align: ${props => (props.textAlign ? props.textAlign : 'initial')};
  min-width: ${props => (props.minWidth ? props.minWidth : 'initial')};
`;

Column.displayName = 'Column';

export const SubColumn = styled(Column)`
  padding: 0 ${props => props.theme.spacing.two};
`;

SubColumn.displayName = 'SubColumn';

export const SpanWithRightPadding = styled.span`
  padding-right: ${props => props.theme.spacing.two};
`;

SpanWithRightPadding.displayName = 'SpanWithRightPadding';
