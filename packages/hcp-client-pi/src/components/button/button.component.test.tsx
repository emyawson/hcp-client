import { shallow } from 'enzyme';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { Button } from './button.component';

const mockTheme = {};

describe('Button component', () => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('button clicked');
  };

  const mockProps = {
    ariaLabel: 'Test now',
    children: 'Test now',
    onClick: handleClick,
  };

  it('renders correctly', () => {
    const wrapper = shallow(
      <ThemeProvider theme={mockTheme}>
        <Button {...mockProps} />
      </ThemeProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
