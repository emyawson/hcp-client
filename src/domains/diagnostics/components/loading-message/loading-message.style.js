import styled from 'styled-components';

import { colors, spacing, transitions } from 'src/domains/diagnostics/styles';
import { Title, weight } from 'src/domains/diagnostics/components/fonts';
import { convertPxToRem, combineRems } from 'src/domains/diagnostics/utils';

export const LoadingMessageContainerDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${props => (props.flexibleHeight ? '100%' : 'auto')};
  justify-content: center;
  min-height: ${props =>
    `${
      props.minHeight === 'inherit'
        ? props.minHeight
        : convertPxToRem(props.minHeight)
    }`};
  transition: ${transitions.default};
  width: 100%;
`;

export const LoadingMessageHeadline = Title.extend`
  color: ${colors.black};
  font-weight: ${weight.semiBold};
  margin: 0 auto ${combineRems(spacing.three, spacing.two)};
  min-height: 1em;
  white-space: pre-wrap;
`;
