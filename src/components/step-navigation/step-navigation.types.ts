export type StepConfig = {
  isCompleted: boolean;
  isActive: boolean;
  isDisabled: boolean;
  title: string;
  onClick?: () => void;
  stepNumber?: number;
};

export type StepNavigationProps = {
  currentStep?: number;
  onChange?: () => void;
  steps: StepConfig[];
};
