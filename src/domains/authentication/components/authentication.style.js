import styled from 'styled-components';

import { spacing, fontSize, colors, borderRadius } from 'src/core/styles';
import { Block, Column, weight } from 'src/components';
import doctorImage from 'src/assets/images/doctor.jpg';
import { convertPxToRem } from 'src/utils/rem-calc';

export const LogoDiv = styled.div`
  position: absolute;
  padding-left: ${props => props.theme.spacing.four};
  padding-top: ${props => props.theme.spacing.four};
`;

LogoDiv.displayName = 'LogoDiv';

export const ErrorBlock = Block.extend`
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: 6.5rem;
`;

export const LoginColumn = Column.extend`
  background-color: ${props => props.theme.colors.white};
  flex: 4;
  justify-content: center;
`;

export const PageBody = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
`;

PageBody.displayName = 'PageBody';

export const FormColumn = styled.div`
  display: flex;
  flex: 4;
  align-items: center;
  padding-left: ${props => props.theme.spacing.six};
`;

FormColumn.displayName = 'FormColumn';

export const MainContent = styled.div`
  background-color: ${props => props.theme.colors.white};
`;

MainContent.displayName = 'MainContent';

export const DescriptionColumn = Column.extend`
  display: flex;
  flex: 4;
`;

DescriptionColumn.displayName = 'DescriptionColumn';

export const DescriptionContainer = Column.extend`
  height: 100%;
  justify-content: center;
  padding-left: ${props => props.theme.spacing.five};
  background-image: url(${props => props.backgroundImage || doctorImage});
  background-size: cover;
  background-position: top;
`;

DescriptionContainer.displayName = 'DescriptionContainer';

export const DescriptionDiv = styled.div`
  padding: ${spacing.three} 0 ${spacing.two};
  font-size: ${fontSize.headline};
  color: ${colors.brandBlue};
  font-weight: ${weight.semiBold};
  max-width: 14rem;
`;

DescriptionDiv.displayName = 'DescriptionDiv';

export const DescriptionDivider = styled.div`
  background-color: ${props => props.theme.colors.brandBlue};
  border-radius: ${borderRadius.three};
  height: ${convertPxToRem(3)};
  margin: 0 0 ${props => props.theme.spacing.three};
  max-width: 6rem;
`;

DescriptionDivider.displayName = 'DescriptionDivider';

export const SubdescriptionDiv = styled.div`
  padding: ${spacing.one} 0 ${spacing.four};
  font-size: ${fontSize.title};
  line-height: ${convertPxToRem(35)};
  width: 20rem;
`;

SubdescriptionDiv.displayName = 'SubdescriptionDiv';
