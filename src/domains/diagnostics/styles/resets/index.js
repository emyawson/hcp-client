import styled from 'styled-components';

// Styled component base styles to reset browser styling on elements
// Apply to elements not fully covered in normalize css
// Such as buttons, form controls

export const ButtonReset = styled.button`
  appearance: none;
  background: transparent;
  border: 0;
  box-shadow: none;
  cursor: pointer;
  display: block;
  margin: 0;
  outline: 0;
  padding: 0;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;
ButtonReset.defaultProps = {
  disabled: false,
};
