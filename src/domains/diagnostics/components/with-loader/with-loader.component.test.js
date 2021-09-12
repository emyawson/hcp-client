import { all } from 'ramda';
import React from 'react';
import { shallow, mount } from 'enzyme';

import {
  hasValue,
  pass,
} from 'src/domains/diagnostics/utils/validation-helpers';

import { withLoader } from './with-loader.component';
import { validateComponentProps } from './with-loader.util';

import { LoadingMessage } from '../loading-message/loading-message.component';

const defaultComponentProps = {
  propToLoad: '',
  anotherPropToLoad: 'patient',
  extraPropToLoad: 'Test123',
  arrayOfPropsAreLoaded: [true, true, true],
};

const defaultValidatorLoading = {
  propToLoad: hasValue,
};

const defaultValidatorLoaded = {
  anotherPropToLoad: hasValue,
};

const defaultValidatorsMixed = {
  ...defaultValidatorLoading,
  ...defaultValidatorLoaded,
};

const defaultValidatorsLoaded = {
  ...defaultValidatorLoaded,
  extraPropToLoad: hasValue,
};

const arrayValidatorLoaded = {
  arrayOfPropsAreLoaded: all(pass),
};

describe('With Loader Component', () => {
  const Component = () => <span />;
  const LoaderComponent = () => <span>Loading</span>;
  const hasLoaded = jest.fn().mockName('loaded');
  const hasError = jest.fn().mockName('failed');

  it('should render a loading indicator while waiting for data', () => {
    const validators = {
      test: () => false,
    };
    const WithLoading = withLoader({ LoaderComponent, validators })(Component);
    const wrapper = shallow(<WithLoading />);
    expect(wrapper.find(LoaderComponent)).toHaveLength(1);
  });
  it('should dispatch an event on error', () => {
    const validators = {
      test: () => false,
    };
    const WithLoading = withLoader({ LoaderComponent, validators })(Component);
    const wrapper = mount(<WithLoading onError={hasError} hasError />);
    expect(wrapper.props().onError).toBeDefined();
    expect(hasError).toHaveBeenCalled();
  });
  it('should render the intended component when data loads', () => {
    const validators = {
      test: () => true,
    };
    const WithLoading = withLoader({ LoaderComponent, validators })(Component);
    const wrapper = shallow(<WithLoading />);
    expect(wrapper.find(Component)).toHaveLength(1);
  });
  it('should dispatch an event on successful load', () => {
    const validators = {
      test: () => true,
    };
    const WithLoading = withLoader({ LoaderComponent, validators })(Component);
    const wrapper = shallow(<WithLoading onLoad={hasLoaded} />);
    expect(wrapper.props().onLoad).toBeDefined();
    expect(hasLoaded).toHaveBeenCalled();
  });
  it('should render a default loading indicator if none is set', () => {
    const validators = {
      test: () => false,
    };
    const WithLoading = withLoader({ validators })(Component);
    const wrapper = shallow(<WithLoading />);
    expect(wrapper.find(LoadingMessage)).toHaveLength(1);
  });
});

describe('With Loader Utils', () => {
  test('Default validator is loading as expected', () => {
    expect(
      validateComponentProps(defaultValidatorLoading, defaultComponentProps),
    ).toBe(false);
  });

  test('Default validator is loaded as expected', () => {
    expect(
      validateComponentProps(defaultValidatorLoaded, defaultComponentProps),
    ).toBe(true);
  });

  test('Set of validators are loading as expected', () => {
    expect(
      validateComponentProps(defaultValidatorsMixed, defaultComponentProps),
    ).toBe(false);
  });

  test('Set of validators is loaded as expected', () => {
    expect(
      validateComponentProps(defaultValidatorsLoaded, defaultComponentProps),
    ).toBe(true);
  });

  test('Array validator is loaded as expected', () => {
    expect(
      validateComponentProps(arrayValidatorLoaded, defaultComponentProps),
    ).toBe(true);
  });

  test('Validating non-existant single prop shows component immediately', () => {
    expect(
      validateComponentProps(null, defaultComponentProps, 'nonExistantProp'),
    ).toBe(true);
  });
});
