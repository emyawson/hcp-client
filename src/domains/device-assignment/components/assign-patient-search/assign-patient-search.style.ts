import styled from 'styled-components';

import { TableAltRow } from 'src/components';
import { ResultCell } from 'src/widgets/patient-search/components/search-results.style';

export const AssignPatientTableRow = styled(TableAltRow)`
  td {
    cursor: pointer;
  }
`;

export const AssignPatientResultNameCell = styled(ResultCell)`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;
