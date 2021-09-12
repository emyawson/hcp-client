import { handleKeyPressClick, handleKeyPressExit, keyCodes } from './keypress';

describe('Keypress Util test suite', () => {
  const mockEnterEvent = {
    charCode: keyCodes.ENTER,
  };
  const mockEscapeEvent = {
    charCode: keyCodes.ESCAPE,
  };
  const mockEvent = {
    charCode: 65, // "a" key
  };
  describe('Simulate click', () => {
    it('should capture a key press for a click action', () => {
      const mockOnClick = jest.fn().mockName('onClick Handler');
      handleKeyPressClick(mockOnClick)(mockEnterEvent);
      expect(mockOnClick).toHaveBeenCalled();
      expect(mockOnClick).toHaveBeenCalledWith(mockEnterEvent);
    });
    it('should not call anything on alphanumeric keys', () => {
      const mockOnClick = jest.fn().mockName('onClick Handler');
      handleKeyPressClick(mockOnClick)(mockEvent);
      expect(mockOnClick.mock.calls.length).toBe(0);
    });
  });
  describe('Simulate escape', () => {
    it('should capture a key press for an exit action', () => {
      const mockOnExit = jest.fn().mockName('onExit Handler');
      handleKeyPressExit(mockOnExit)(mockEscapeEvent);
      expect(mockOnExit).toHaveBeenCalled();
      expect(mockOnExit).toHaveBeenCalledWith(mockEscapeEvent);
    });
    it('should not call anything on alphanumeric keys', () => {
      const mockOnExit = jest.fn().mockName('onExit Handler');
      handleKeyPressClick(mockOnExit)(mockEvent);
      expect(mockOnExit.mock.calls.length).toBe(0);
    });
  });
});
