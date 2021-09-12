export const keyCodes = {
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

// Capture keyboard and mimic click events on typically non-interactive elements
// Use button elements wherever possible for default keyboard support
export const handleKeyPressClick = handler => e => {
  const { ENTER, SPACE } = keyCodes;
  if (e.charCode === ENTER || e.charCode === SPACE) {
    handler(e);
  }
};

// Avoid keyboard traps! Allow users to exit modals or galleries with esc
export const handleKeyPressExit = handler => e => {
  const { ESCAPE } = keyCodes;
  if (e.charCode === ESCAPE) {
    handler(e);
  }
};
