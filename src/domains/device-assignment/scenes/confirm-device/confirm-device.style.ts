import styled from 'styled-components';

import { weight } from 'src/components/fonts/weights';
import {
  borderRadius,
  boxShadows,
  colors,
  fontSize,
  spacing,
} from 'src/core/styles';
import { convertPxToRem } from 'src/utils/index';

export const DeviceInformationDiv = styled.div`
  margin: 0 auto ${spacing.four};
`;

export const MainSubheaderDiv = styled.div`
  text-transform: uppercase;
  font-size: ${fontSize.p};
  font-weight: ${weight.bold};
  color: ${colors.darkBlueMarine};
  padding: ${spacing.three} 0;
`;

export const WrongDeviceTooltip = styled.div`
  border-radius: ${borderRadius.three};
  box-shadow: ${boxShadows.two};
  background-color: ${colors.white};
  border: solid 1px ${colors.quartzBlue};
  padding: ${spacing.three};
  max-width: ${convertPxToRem(400)};
  font-size: ${fontSize.p};
`;
