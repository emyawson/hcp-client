import styled from 'styled-components';

import { combineRems } from 'src/utils';
import { colors, borderRadius, spacing, fontSize } from 'src/core';
import { Button } from 'src/components/button';
import { weight } from 'src/components';

export const FiltersRowDiv = styled.div`
  width: 100%;
  display: flex;
  padding: ${combineRems(spacing.one, spacing.three)} 0;
  justify-content: center;
  align-items: center;
`;
export const Filter = styled(Button)`
  display: block;
  background-color: ${props => (props.active ? colors.lavender : colors.white)};
  color: ${props => (props.active ? colors.brandBlue : colors.charcoal)};
  min-width: auto;
  border: 1px solid ${colors.quartzBlue};
  border-radius: 0;
  padding: ${combineRems(spacing.one, spacing.two)} ${spacing.four};
  &:first-child,
  &:first-child:hover {
    border-radius: ${borderRadius.three} 0 0 ${borderRadius.three};
    border-right: 0;
  }
  &:last-child {
    border-radius: 0 ${borderRadius.three} ${borderRadius.three} 0;
  }
  &:hover {
    background-color: ${props =>
      props.active ? colors.lavender : colors.white};
    color: ${colors.brandBlue};
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  & > ${Filter}:first-child:hover + ${Filter} {
    border-left: 1px solid ${colors.brandBlue};
  }
`;
FiltersWrapper.displayName = 'FiltersOptionsWrapper';

export const OptionsListWrapper = styled.div`
  max-height: 10rem;
  overflow-y: auto;
  border-top: 1px solid ${colors.silver};
`;

export const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OptionLabel = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 1rem;
  color: ${props => (props.inactive ? colors.grayMedium : colors.black)};
`;

export const OptionTag = styled.div`
  background-color: ${colors.silver};
  text-transform: uppercase;
  font-size: ${fontSize.label};
  color: ${colors.grayDark};
  border: 1px solid ${colors.grayLight};
  border-radius: 4px;
  height: 1rem;
  line-height: 1rem;
  padding: 0 ${spacing.one};
  font-weight: ${weight.bold};
`;

export const GuideValueWrapper = styled.div`
  padding-right: ${spacing.two};
`;
