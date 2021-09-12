import styled, { injectGlobal } from 'styled-components';

import {
  boxShadow,
  colors,
  spacing,
  zIndexes,
  fadeIn,
  transitionSpeed,
  transitionEasing,
} from 'src/core/styles';
import { Column } from 'src/components/column';

const FadeInWrapper = styled.div`
  animation: ${fadeIn} ${transitionSpeed.slow} ${transitionEasing.enter}
    ${transitionSpeed.default} forwards;
  opacity: 0;
`;

export const DocumentNavigationButtonContainer = FadeInWrapper.extend`
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.theme.spacing.three};
  position: fixed;
  top: 0;
  z-index: ${zIndexes.foreground};

  button {
    min-height: 40px;
    padding: ${spacing.two};
  }
`;

export const DocumentNavigationButtonContainerLeft = DocumentNavigationButtonContainer.extend`
  left: 0;
`;
export const DocumentNavigationButtonContainerRight = DocumentNavigationButtonContainer.extend`
  right: 0;
`;

export const DocumentWrapper = Column.extend`
  min-height: 100vh;
`;

export const DocumentHeader = styled.div`
  align-items: baseline;
  background-color: ${props => props.theme.colors.brandBlue};
  box-shadow: ${boxShadow({ depth: 'overlay', color: colors.black })};
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  margin: 0 auto ${props => props.theme.spacing.four};
  padding: ${props => props.theme.spacing.three}
    ${props => props.theme.spacing.four};
  text-align: center;
  width: 100%;
  z-index: ${zIndexes.overlay};
`;

export const DocumentPages = FadeInWrapper.withComponent('span').extend`
  font-size: ${props => props.theme.fontSize.p};
  margin-left: ${props => props.theme.spacing.three};
`;

export const DocumentClose = styled.span``;

export const ArrowFlipSpan = styled.span`
  display: inline-block;
  transform: scaleX(-1);
`;

// tslint:disable:no-unused-expression
injectGlobal`
  .react-pdf__message--loading {
    color: ${colors.white};
    padding: ${spacing.four};
  }
  .react-pdf__Document {
    padding-bottom: ${spacing.three};
  }
`; // tslint:enable:no-unused-expression
