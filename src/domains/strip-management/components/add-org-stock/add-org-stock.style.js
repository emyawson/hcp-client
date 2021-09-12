import styled from 'styled-components';

import { ControlText, weight } from 'src/components';
import { combineRems, convertPxToRem } from 'src/utils';
import { breakpoints, spacing } from 'src/core';

const Flex = styled.div`
  display: flex;
`;
const FlexColumn = Flex.extend`
  flex-direction: column;
`;

export const AddOrgStockWrapperDiv = styled.div`
  padding: ${props => props.theme.spacing.three} 0;
`;

export const AddOrgStockRowDiv = Flex.extend`
  flex-wrap: wrap;
  margin: ${props =>
    `0 auto ${combineRems(
      props.theme.spacing.three,
      props.theme.spacing.four,
    )}`};
`;

export const AddOrgStockFieldLabel = styled.label`
  font-weight: ${weight.semiBold};
  font-size: ${props => props.theme.fontSize.p};
  padding-bottom: ${props => props.theme.spacing.three};
`;

export const AddOrgStockFieldDiv = styled.div`
  margin-bottom: ${spacing.four};
  width: 100%;

  @media (min-width: ${breakpoints.medium}) {
    margin-bottom: 0;
    width: 50%;

    &:first-child {
      padding-right: ${spacing.four};
    }
  }
`;

export const NumberOfStripsControl = styled(ControlText)`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayLight};
  max-width: ${props =>
    combineRems(props.theme.spacing.five, props.theme.spacing.two)};
  outline: none;
  padding: ${props => `${props.theme.spacing.one} ${props.theme.spacing.two}`};
  text-align: center;
  font-size: ${props => props.theme.fontSize.p};
  height: 100%;

  &[disabled] {
    background-color: ${props => props.theme.colors.silverLight};
    color: ${props => props.theme.colors.grayMedium};
  }
`;

export const NumberOfStripsControlDiv = styled.div`
  height: 100%;
`;

export const NumberOfStripsFieldDiv = FlexColumn.extend`
  padding-right: ${props => props.theme.spacing.four};

  input {
    max-width: ${convertPxToRem(96)};
  }
`;

export const AddOrgStockNumberInputsDiv = Flex.extend`
  width: 100%;
`;

export const AddOrgStockSubmitDiv = Flex.extend`
  justify-content: center;
  padding: ${props => `${props.theme.spacing.four} 0 0`};
`;
