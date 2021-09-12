import { mount, shallow } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { CaretButton } from 'src/domains/diagnostics/components';
import { theme } from 'src/theme'; // TODO: move to diagnostics, make it a top-level dependency, or make mock theme object

import {
  CardCollapsable,
  headerDisplayMode,
  displayModes,
} from './card-collapsable.component';

const mountWithTheme = (tree, theme) => {
  const context = shallow(<ThemeProvider theme={theme} />)
    .instance()
    .getChildContext();

  return mount(tree, {
    context,
    childContextTypes: ThemeProvider.childContextTypes, // Needed so child components receive the theme prop
  });
};

describe('CardCollapsable', () => {
  const defaultProps = {
    title: 'CardCollapsable',
    cardStyles: ['default'],
  };

  it('renders correctly with a title', () => {
    const wrapper = shallow(
      <CardCollapsable {...defaultProps}>
        <div>test</div>
      </CardCollapsable>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('sets matching display mode for header and toggle', () => {
    expect(displayModes('DISABLED')).toEqual({
      caret: 'DISABLED',
      header: 'DISABLED',
    });
  });

  it('sets default display mode based on props', () => {
    const mockDisabledProps = {
      ...defaultProps,
      isDisabled: true,
    };
    const mockActiveProps = {
      ...defaultProps,
      isCollapsed: false,
    };
    const mockDefaultProps = {
      ...defaultProps,
      isCollapsed: true,
    };
    expect(headerDisplayMode(mockDisabledProps).header).toEqual('DISABLED');
    expect(headerDisplayMode(mockActiveProps).header).toEqual('ACTIVE');
    expect(headerDisplayMode(mockDefaultProps).header).toEqual('DEFAULT');
  });
  it('renders the appropriate header display mode based on props', () => {
    const mockDisabledProps = {
      ...defaultProps,
      isDisabled: true,
    };
    const mockActiveProps = {
      ...defaultProps,
      isCollapsed: false,
    };
    const wrapper = mountWithTheme(
      <CardCollapsable {...mockDisabledProps}>
        <div>content</div>
      </CardCollapsable>,
      theme,
    );
    const activeWrapper = mountWithTheme(
      <CardCollapsable {...mockActiveProps}>
        <div>content</div>
      </CardCollapsable>,
      theme,
    );
    expect(
      wrapper
        .find(CaretButton)
        .first()
        .props().mode,
    ).toBe('DISABLED');
    expect(
      activeWrapper
        .find(CaretButton)
        .first()
        .props().direction,
    ).toBe('UP');
  });
});
