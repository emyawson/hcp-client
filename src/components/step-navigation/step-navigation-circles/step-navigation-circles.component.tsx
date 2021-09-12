import * as React from 'react';
import { colors } from 'src/core/styles';

import { CheckmarkIcon } from '../../../assets/icons/index';
import { StepConfig, StepNavigationProps } from '../step-navigation.types';

import {
  StepNavigationCirclesContainer,
  StepNavigationCirclesItemButton,
  StepNavigationCirclesItemLabel,
  StepNavigationCirclesItemLabelText,
  StepNavigationCirclesListItem,
  StepNavigationCirclesWrapper,
  StepNavigationConnectingLine,
} from './step-navigation-circles.style';

const StepNavigationCirclesButton = ({
  isDisabled,
  isActive,
  onClick,
  title,
  isCompleted,
  stepNumber,
}: StepConfig) => (
  <StepNavigationCirclesListItem>
    <StepNavigationCirclesItemLabel>
      <StepNavigationCirclesItemLabelText>
        {title}
      </StepNavigationCirclesItemLabelText>
    </StepNavigationCirclesItemLabel>
    <StepNavigationCirclesItemButton
      isDisabled={isDisabled}
      isActive={isActive}
      onClick={onClick}
    >
      {isCompleted ? (
        <CheckmarkIcon height={12} fillColor={colors.blueMarine} />
      ) : (
        stepNumber
      )}
    </StepNavigationCirclesItemButton>
  </StepNavigationCirclesListItem>
);

export const StepNavigationCircles = ({
  currentStep,
  steps,
  onChange,
}: StepNavigationProps) => {
  const lastStep = steps.length;
  return (
    <StepNavigationCirclesContainer>
      <StepNavigationCirclesWrapper>
        {steps.map((stepConfig, i) => (
          <React.Fragment key={stepConfig.title}>
            <StepNavigationCirclesButton
              {...stepConfig}
              onClick={onChange}
              stepNumber={i + 1}
            />
            {i + 1 !== lastStep && <StepNavigationConnectingLine />}
          </React.Fragment>
        ))}
      </StepNavigationCirclesWrapper>
    </StepNavigationCirclesContainer>
  );
};
