import * as React from 'react';
import { hasValue } from 'src/utils';

import { CheckmarkIcon } from '../../assets/icons/index';

import {
  StepNavigationContainer,
  StepNavigationItemButton,
  StepNavigationItemLabel,
  StepNavigationItemLabelText,
  StepNavigationListItem,
  StepNavigationWrapper,
  SuccessWrapper,
} from './step-navigation.style';
import { StepConfig, StepNavigationProps } from './step-navigation.types';

const SuccessBadge = ({ size }: { size: number }) => (
  <SuccessWrapper size={size}>
    <CheckmarkIcon height={size / 2} />
  </SuccessWrapper>
);

export const StepNavigationButton = ({
  isDisabled,
  isActive,
  onClick,
  title,
  isCompleted,
}: StepConfig) => (
  <StepNavigationItemButton
    isDisabled={isDisabled}
    isActive={isActive}
    onClick={onClick}
    isReadOnly={!hasValue(onClick)}
  >
    <StepNavigationItemLabel>
      {isCompleted ? <SuccessBadge size={24} /> : ''}
      <StepNavigationItemLabelText>{title}</StepNavigationItemLabelText>
    </StepNavigationItemLabel>
  </StepNavigationItemButton>
);

export const StepNavigation = ({
  currentStep,
  steps,
  onChange,
}: StepNavigationProps) => (
  <StepNavigationContainer>
    <StepNavigationWrapper>
      {steps.map(stepConfig => (
        <StepNavigationListItem key={stepConfig.title}>
          <StepNavigationButton {...stepConfig} onClick={onChange} />
        </StepNavigationListItem>
      ))}
    </StepNavigationWrapper>
  </StepNavigationContainer>
);
