import styled from 'styled-components';

import { colors } from 'src/domains/diagnostics/styles';

import { BLOOD_GLUCOSE_CELL_LABELS } from './logbook-stats.constants';

// TODO - make these colors shared constants across logbook tables
const bloodGlucoseCellLabelsBackgroundColorMap = {
  [BLOOD_GLUCOSE_CELL_LABELS.HYPO]: colors.trafficRed2,
  [BLOOD_GLUCOSE_CELL_LABELS.BELOW_TARGET_RANGE]: colors.trafficRed2,
  [BLOOD_GLUCOSE_CELL_LABELS.IN_RANGE]: null,
  [BLOOD_GLUCOSE_CELL_LABELS.HYPER]: colors.quartzBlue,
};

const bloodGlucoseCellLabelsTextColorMap = {
  [BLOOD_GLUCOSE_CELL_LABELS.HYPO]: colors.charcoal,
  [BLOOD_GLUCOSE_CELL_LABELS.BELOW_TARGET_RANGE]: colors.charcoal,
  [BLOOD_GLUCOSE_CELL_LABELS.IN_RANGE]: colors.green,
  [BLOOD_GLUCOSE_CELL_LABELS.HYPER]: colors.charcoal,
};

export const BloodGlucoseCellWrapper = styled.div`
  background-color: ${({ label }) =>
    bloodGlucoseCellLabelsBackgroundColorMap[label]};
  color: ${({ label }) => bloodGlucoseCellLabelsTextColorMap[label]};
  border-radius: ${props => props.theme.borderRadius[1]};
  width: 2.75rem;
  margin: 0 auto;
  display: flex;
`;

BloodGlucoseCellWrapper.displayName = 'BloodGlucoseCellWrapper';
