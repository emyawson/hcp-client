import styled, { css } from 'styled-components';

import { weight } from 'src/components/fonts/weights';
import { combineRems } from 'src/utils';

export const LabelledGridItemData = styled.p`
  font-size: ${props => props.theme.fontSize.p};
  font-weight: ${weight.bold};
  margin: 0 auto;
`;
export const LabelledGridItemSubHeading = styled.p`
  color: ${props => props.theme.colors.grayDark};
  font-size: ${props => props.theme.fontSize.caption};
  font-weight: ${weight.semiBold};
  margin: 0 auto
    ${props => combineRems(props.theme.spacing.one, props.theme.spacing.two)};
  text-transform: uppercase;
`;
export const LabelledGridItemHighlighted = css`
  background: ${props => props.theme.colors.blueMarineAlpha};
  border-bottom: none;
  color: ${props => props.theme.colors.blue};
  font-size: ${props => props.theme.fontSize.p};
  padding-left: ${props => props.theme.spacing.three};

  ${LabelledGridItemSubHeading} {
    font-weight: ${weight.bold};
  }
  ${LabelledGridItemData} {
    text-transform: uppercase;
  }
`;

export const LabelledGridRowTitle = css`
  margin: 0;
  padding-left: ${props => props.theme.spacing.four};
`;
export const LabelledGridItemDiv = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.silver};
  flex-grow: ${props => (props.stretchToFitRow ? '1' : '0')};
  margin-left: ${props => props.theme.spacing.four};
  padding: ${props =>
    `${props.theme.spacing.three} ${props.theme.spacing.four} ${
      props.theme.spacing.three
    } 0`};
  width: ${props => (props.stretchToFitRow ? '100%' : '')};

  ${props => (props.highlighted ? LabelledGridItemHighlighted : '')};
  ${props => (props.isRowTitle ? LabelledGridRowTitle : '')};
`;
