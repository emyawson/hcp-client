import React, { Component } from 'react';
import { equals } from 'ramda';

import { isNotEqual } from 'src/utils';

import { AccordionContainerDiv } from './accordion.style';
// import { AccordionItemId, ActiveItems } from "./accordion.type";

/*type Props = {
  activeItems: ActiveItems,
  children: Node,
  allowMultiple?: boolean,
  label?: string,
  labelDisplayLogic?: () => boolean,
  labelled?: boolean,
  onChange?: Function,
  sendInitialChangeEvent: boolean,
};

type State = {
  activeItems: ActiveItems,
};*/

// Container for accordion component logic
// To create full accordion UI, nest AccordionItem components inside
// To set default active item(s), pass an array of strings matching AccordionItem IDs
// ---------------------------------
// Example:
// <Accordion activeItems=["example1"]>
//  <AccordionItem title="Example 1" id="example1">
//    <p>This is an example of accordion content</p>
//  </AccordionItem>
//  <AccordionItem title="Example 2" id="example2">
//    <p>This is an example of more accordion content</p>
//  </AccordionItem>
// </Accordion>
// ---------------------------------
// By default, will only allow one expanded item at a time
// This behaviour can be modified with the allowMultiple prop
// ---------------------------------
export class Accordion extends Component {
  static defaultProps = {
    activeItems: [],
    allowAllItemsClosed: false,
    allowMultiple: false,
    label: '',
    labelDisplayLogic: () => true,
    labelled: false,
    onChange: () => undefined,
    sendInitialChangeEvent: true,
  };
  constructor(props) {
    super();
    const { activeItems, allowMultiple, allowAllItemsClosed, children } = props;
    const initialItemId = this.getInitialItemId(children);
    this.state = {
      activeItems: this.setActiveItems(
        activeItems,
        allowMultiple,
        allowAllItemsClosed,
        initialItemId,
      ),
    };
  }

  state;

  // Notify parent components if we calculated a new initial active item set
  componentDidMount() {
    if (
      !equals(this.props.activeItems, this.state.activeItems) &&
      this.props.sendInitialChangeEvent
    ) {
      this.handleAccordionItemChange();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isNotEqual(nextProps)(this.props)) {
      this.updateActiveItemsFromProps(nextProps);
    }
  }

  render() {
    return (
      <AccordionContainerDiv role="tablist">
        {this.renderAccordionItems()}
      </AccordionContainerDiv>
    );
  }

  // Grab id of the first item in our accordion
  // Used as fallback if no active item is set
  getInitialItemId = accordionItems =>
    accordionItems &&
    accordionItems.length &&
    React.Children.toArray(accordionItems).length
      ? React.Children.toArray(accordionItems)[0].props.id
      : '';

  // Notify other components that the accordion has updated
  handleAccordionItemChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.activeItems);
    }
  };

  isItemActive = itemId => this.state.activeItems.indexOf(itemId) !== -1;

  // Modify AccordionItems to explicitly set active state and bind click handlers
  renderAccordionItems = () =>
    React.Children.map(this.props.children, (accordionItem, index) => {
      const itemId = accordionItem.props.id || index;
      const active = this.isItemActive(itemId);
      const disabled = active && !this.props.allowMultiple;
      const { label, labelled, labelDisplayLogic } = this.props;
      return React.cloneElement(accordionItem, {
        active,
        disabled,
        key: `AccordionItem--${itemId}`,
        label,
        labelDisplayLogic,
        labelled,
        toggleHandler: () => {
          this.toggleItemActive(itemId);
        },
      });
    });

  // Filter provided active items data based on accordion type
  setActiveItems = (
    activeItems,
    allowMultiple,
    allowAllItemsClosed,
    initialItemId,
  ) => {
    // If none set and all items can't be closed, set first Accordion Item to active
    const defaultActiveItems = allowAllItemsClosed ? [] : [initialItemId];
    if (allowMultiple) {
      // Display all of the requested items
      return activeItems ? activeItems.slice() : defaultActiveItems;
    }
    // Limit to only one active item at a time
    const isActiveItemSet = activeItems.length && activeItems[0] !== '';
    return isActiveItemSet ? [activeItems[0]] : defaultActiveItems;
  };

  // Handle a click event from accordion header
  // Toggle the clicked item's active state
  toggleItemActive = itemId => {
    let activeItems = [...this.state.activeItems];
    const activeIndex = activeItems.indexOf(itemId);
    const isActive = activeIndex !== -1;
    if (this.props.allowMultiple) {
      if (isActive) {
        activeItems.splice(activeIndex, 1);
      } else {
        activeItems.push(itemId);
      }
    } else {
      if (this.props.allowAllItemsClosed) {
        activeItems = isActive ? [] : [itemId];
      } else {
        activeItems = [itemId];
      }
    }
    this.setState({ activeItems }, this.handleAccordionItemChange);
  };

  updateActiveItemsFromProps = nextProps => {
    const {
      activeItems,
      allowMultiple,
      allowAllItemsClosed,
      children,
    } = nextProps;
    const initialItemId = this.getInitialItemId(children);
    const nextActiveItems = this.setActiveItems(
      activeItems,
      allowMultiple,
      allowAllItemsClosed,
      initialItemId,
    );
    if (isNotEqual(nextActiveItems)(this.state.activeItems)) {
      this.setState(
        { activeItems: nextActiveItems },
        this.handleAccordionItemChange,
      );
    }
  };
}
