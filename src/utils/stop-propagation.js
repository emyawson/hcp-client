export const stopPropagation = handler => e => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
  handler(e);
};
