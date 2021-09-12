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

export const ListReset = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const OrderedListReset = ListReset.withComponent('ol');

export const HrReset = styled.hr`
  background-color: transparent;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  margin: 0;
  outline: none;
`;
