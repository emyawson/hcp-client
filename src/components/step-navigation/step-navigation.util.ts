export const transformStepItems = (
  activePosition: number,
  stepItems: Array<{ title: string }>,
) =>
  stepItems.map((stepItem, stepItemIndex) => ({
    isActive: stepItemIndex === activePosition,
    isDisabled: stepItemIndex > activePosition,
    isCompleted: stepItemIndex < activePosition,
    ...stepItem,
  }));
