import styled from 'styled-components';

import { colors, spacing } from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing.two} ${spacing.two} 0 ${spacing.two};
  height: 100%;
`;

export const Title = styled.div`
  color: ${colors.blue};
  font-weight: ${weight.bold};
  padding: ${spacing.one} ${spacing.three};
  margin-bottom: ${spacing.one};
`;

export const ListSectionsContainer = styled.div`
  display: flex;
  height: 100%;
`;

export const ListSection = styled.div`
  flex: 1;
  height: 100%;
  border-right: ${props =>
    props.borderRight ? `0.0625rem solid ${colors.grayLight}` : 'none'};
`;

export const ListsContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;

export const List = styled.ul`
  flex: ${props => (props.flex ? props.flex : 1)};
  height: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0 ${spacing.three};
`;

export const ListElement = styled.li`
  font-weight: ${props => (props.bold ? weight.bold : weight.normal)};
  padding: ${spacing.one} 0;
  white-space: nowrap;
`;

export const ListElementSectionHeader = styled.div`
  color: ${colors.grayDark};
  padding: ${spacing.two} ${spacing.three};
`;

export const IconContainer = styled.div`
  display: inline-block;
  padding-right: ${spacing.two};
`;
