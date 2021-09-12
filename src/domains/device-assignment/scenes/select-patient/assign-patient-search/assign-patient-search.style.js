import styled from 'styled-components';

import { ButtonReset } from 'src/core/styles';
import {
  spacing,
  colors,
  borderRadius,
  fontWeights,
  fontSize,
  transitions,
} from 'src/core/styles';
import { TitleName, InputText } from 'src/components/index';
import { combineRems } from 'src/utils';

export const Panel = styled.div`
  border-radius: ${borderRadius.three};
  background-color: ${colors.blueMarineAlpha5};
  border: solid 1px ${colors.quartzBlue};
`;

export const SearchPatientFormDiv = Panel.extend`
  padding: ${spacing.four} ${spacing.four} 0 ${spacing.four};
`;

export const SearchPatientInputField = styled(InputText)`
  border-radius: ${borderRadius.three};
  border-color: ${colors.silverMedium};
  font-size: ${fontSize.p};
  margin-right: ${spacing.three};
  padding: ${spacing.three} ${combineRems(spacing.one, spacing.three)};

  &:placeholder {
    color: ${colors.charcoal};
  }
`;

export const AddPatientIconButton = styled(ButtonReset)`
  border-radius: ${borderRadius.three};
  background-color: ${colors.white};
  border: solid 1px ${colors.quartzBlue};
  padding: ${spacing.two};
  transition: ${transitions.default};

  svg path {
    transition: ${transitions.default};
  }

  &:hover {
    background-color: ${colors.brandBlue};
    svg path {
      fill: ${colors.white};
    }
    svg path,
    svg circle {
      stroke: ${colors.white};
    }
  }
  margin-left: auto;
  width: 50px;
`;

export const SelectPatientComponentDiv = styled.div`
  background: ${colors.white};
`;

export const AssignDeviceTitle = TitleName.extend`
  text-align: center;
  padding-bottom: ${spacing.three};
  border-bottom: 1px ${colors.silverMedium} solid;
`;

export const DeviceInfoDiv = styled.div`
  text-align: center;
`;

export const DeviceIconDiv = styled.div`
  margin: ${spacing.two} auto ${spacing.three};
  text-align: center;
`;

export const DeviceNameHeader = styled.div`
  text-align: center;
  font-weight: ${fontWeights.bold};
  margin: ${spacing.two} auto;
  color: ${colors.charcoal};
`;

export const DeviceSerialNumberDiv = Panel.extend`
  display: inline-block;
  font-size: ${fontSize.p};
  padding: ${spacing.two} ${spacing.three};
  text-align: center;
`;

export const PatientSearchFields = styled.div`
  width: 100%;
  display: flex;
`;
