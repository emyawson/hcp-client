import styled from 'styled-components';

import { spacing, colors, borderRadius, fontSize } from 'src/core';
import { combineRems } from 'src/utils';
import { TableCell } from 'src/components/table-cell';
import { TableHeader } from 'src/components/table-header';

export const ResultCell = styled(TableCell)`
  padding: ${spacing.four} ${spacing.three};
  font-weight: ${props => (props.bold ? '700' : '400')};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${colors.charcoal};
  border-bottom: 1px solid ${colors.silverMedium};
`;

export const PatientTableHeader = styled(TableHeader)`
  background-color: ${colors.blueMarineAlpha5};
  border-radius: ${borderRadius.three};
`;

export const ResultHeaderCell = styled(ResultCell)`
  padding: ${spacing.three};
  color: ${colors.blueMarine};
  border: none;
  text-transform: uppercase;
  font-size: ${fontSize.p};
`;

export const ResultLoaderSpan = styled.span`
  display: flex;
  justify-content: center;
  padding: ${combineRems(spacing.one, spacing.two)} 0;
`;
