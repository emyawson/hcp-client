import React from 'react';
import { shallow } from 'enzyme';

import { theme } from 'src/theme';
import { mountWithTheme } from 'src/test/render-with-theme';

import { Accordion } from './accordion.component';
import { AccordionItem } from './accordion-item';

const defaultProps = {
  activeItems: [],
  allowAllItemsClosed: false,
  allowMultiple: false,
  label: '',
  labelled: false,
  sendInitialChangeEvent: true,
};

describe('Accordion component tests', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallow(
      <Accordion {...defaultProps}>
        <AccordionItem>
          <div />
        </AccordionItem>
        <AccordionItem>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with sensible default props', () => {
    const wrapper = mountWithTheme(
      <Accordion {...defaultProps}>
        <AccordionItem>
          <div />
        </AccordionItem>
        <AccordionItem>
          <div />
        </AccordionItem>
      </Accordion>,
      theme,
    );
    expect(wrapper.props().labelDisplayLogic()).toEqual(true);
    expect(wrapper.props().onChange).toBeDefined();
  });
  it('renders the correct number of accordion items', () => {
    const wrapper = shallow(
      <Accordion {...defaultProps}>
        <AccordionItem>
          <div />
        </AccordionItem>
        <AccordionItem>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    expect(wrapper.find(AccordionItem)).toHaveLength(2);
  });
  it('attaches the correct click handler to accordion items', () => {
    const activeId = 'pickMe';
    const nextId = 'meNext';
    const wrapper = mountWithTheme(
      <Accordion {...defaultProps} activeItems={[nextId]}>
        <AccordionItem id={activeId}>
          <div />
        </AccordionItem>
        <AccordionItem id={nextId}>
          <div />
        </AccordionItem>
      </Accordion>,
      theme,
    );
    wrapper
      .find(AccordionItem)
      .first()
      .props()
      .toggleHandler();
    expect(wrapper.state().activeItems).toEqual([activeId]);
  });
  it('sets the first item active when none is specified', () => {
    const activeId = 'pickMe';
    const wrapper = shallow(
      <Accordion {...defaultProps}>
        <AccordionItem id={activeId}>
          <div />
        </AccordionItem>
        <AccordionItem>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    expect(wrapper.state().activeItems).toEqual([activeId]);
    expect(wrapper.instance().getInitialItemId()).toEqual('');
  });
  it('sets the first default item in a list active, when only one is allowed', () => {
    const activeId = 'pickMe';
    const wrapper = shallow(
      <Accordion {...defaultProps} activeItems={[activeId, 'anotherId']}>
        <AccordionItem id={activeId}>
          <div />
        </AccordionItem>
        <AccordionItem>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    expect(wrapper.state().activeItems).toEqual([activeId]);
  });
  it('sets the desired item active when requested', () => {
    const activeId = 'pickMe';
    const nextId = 'meNext';
    const wrapper = shallow(
      <Accordion {...defaultProps}>
        <AccordionItem id={activeId}>
          <div />
        </AccordionItem>
        <AccordionItem id={nextId}>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    wrapper.instance().toggleItemActive(nextId);
    expect(wrapper.state().activeItems).toEqual([nextId]);
  });
  it('sets multiple items to active when allowed', () => {
    const activeId = 'pickMe';
    const nextId = 'meNext';
    const anotherId = 'andMe';
    const wrapper = shallow(
      <Accordion {...defaultProps} allowMultiple allowAllItemsClosed>
        <AccordionItem id={activeId}>
          <div />
        </AccordionItem>
        <AccordionItem id={nextId}>
          <div />
        </AccordionItem>
        <AccordionItem id={anotherId}>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    wrapper.instance().toggleItemActive(nextId);
    wrapper.instance().toggleItemActive(anotherId);
    expect(wrapper.state().activeItems).toEqual([nextId, anotherId]);
  });
  it('sets multiple default items to active when allowed', () => {
    const firstId = 'pickMe';
    const nextId = 'meNext';
    const anotherId = 'andMe';
    const wrapper = shallow(
      <Accordion
        {...defaultProps}
        activeItems={[nextId, anotherId]}
        allowMultiple
        allowAllItemsClosed
      >
        <AccordionItem id={firstId}>
          <div />
        </AccordionItem>
        <AccordionItem id={nextId}>
          <div />
        </AccordionItem>
        <AccordionItem id={anotherId}>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    expect(wrapper.state().activeItems).toEqual([nextId, anotherId]);
  });
  it('adds a new active item to the default list', () => {
    const firstId = 'pickMe';
    const nextId = 'meNext';
    const anotherId = 'andMe';
    const wrapper = shallow(
      <Accordion
        {...defaultProps}
        activeItems={[nextId, anotherId]}
        allowMultiple
        allowAllItemsClosed
      >
        <AccordionItem id={firstId}>
          <div />
        </AccordionItem>
        <AccordionItem id={nextId}>
          <div />
        </AccordionItem>
        <AccordionItem id={anotherId}>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    wrapper.instance().toggleItemActive(firstId);
    expect(wrapper.state().activeItems).toEqual([nextId, anotherId, firstId]);
  });
  it('removes an active item from the list', () => {
    const activeId = 'pickMe';
    const nextId = 'meNext';
    const anotherId = 'andMe';
    const wrapper = shallow(
      <Accordion
        {...defaultProps}
        activeItems={[activeId, nextId]}
        allowMultiple
        allowAllItemsClosed
      >
        <AccordionItem id={activeId}>
          <div />
        </AccordionItem>
        <AccordionItem id={nextId}>
          <div />
        </AccordionItem>
        <AccordionItem id={anotherId}>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    wrapper.instance().toggleItemActive(activeId);
    expect(wrapper.state().activeItems).toEqual([nextId]);
  });
  it('prevents hiding active item if all items cannot be closed', () => {
    const activeId = 'pickMe';
    const nextId = 'meNext';
    const anotherId = 'andMe';
    const wrapper = shallow(
      <Accordion {...defaultProps} activeItems={[activeId]}>
        <AccordionItem id={activeId}>
          <div />
        </AccordionItem>
        <AccordionItem id={nextId}>
          <div />
        </AccordionItem>
        <AccordionItem id={anotherId}>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    wrapper.instance().toggleItemActive(activeId);
    expect(wrapper.state().activeItems).toEqual([activeId]);
  });
  it('can close all items', () => {
    const activeId = 'pickMe';
    const nextId = 'meNext';
    const anotherId = 'andMe';
    const wrapper = shallow(
      <Accordion {...defaultProps} activeItems={[activeId]} allowAllItemsClosed>
        <AccordionItem id={activeId}>
          <div />
        </AccordionItem>
        <AccordionItem id={nextId}>
          <div />
        </AccordionItem>
        <AccordionItem id={anotherId}>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    wrapper.instance().toggleItemActive(activeId);
    expect(wrapper.state().activeItems).toEqual([]);
  });
  it('sets no default active when multiple are allowed, but none set', () => {
    const firstId = 'pickMe';
    const nextId = 'meNext';
    const wrapper = shallow(
      <Accordion {...defaultProps} allowMultiple allowAllItemsClosed>
        <AccordionItem id={firstId}>
          <div />
        </AccordionItem>
        <AccordionItem id={nextId}>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    expect(wrapper.state().activeItems).toEqual([]);
  });
  it('sets new items to active when changed in the parent render', () => {
    const firstId = 'pickMe';
    const nextId = 'meNext';
    const nextProps = {
      ...defaultProps,
      activeItems: [nextId],
    };
    const wrapper = shallow(
      <Accordion {...defaultProps} activeItems={[firstId]}>
        <AccordionItem id={firstId}>
          <div />
        </AccordionItem>
        <AccordionItem id={nextId}>
          <div />
        </AccordionItem>
      </Accordion>,
    );
    wrapper.instance().updateActiveItemsFromProps(nextProps);
    expect(wrapper.state().activeItems).toEqual([nextId]);
  });
});
