import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { or, not, and } from 'ramda';

const shouldToggleCollapsed = ({ isCollapsed, isDisabled }) =>
  or(and(isDisabled, not(isCollapsed)), not(isDisabled));

// - For custom collapsable components, addCollapsable can be used to provide a (state) prop
//   isCollapsed and a toggle action toggleCollapsed to any component (to use as needed)
// - Using isDisabled (optional Component prop): when isDisabled is true, isCollapsed will also be set to true
export const addCollapsable = compose(
  withState(
    'isCollapsed',
    'toggleCollapsed',
    ({ collapsedByDefault = false, isDisabled = false }) =>
      or(collapsedByDefault, isDisabled),
  ),
  withHandlers({
    onToggleCollapsed: ({
      toggleCollapsed,
      isCollapsed,
      isDisabled = false,
    }) => () => {
      if (shouldToggleCollapsed({ isCollapsed, isDisabled }))
        toggleCollapsed(!isCollapsed);
    },
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { onToggleCollapsed, isDisabled = false } = this.props;
      if (nextProps.isDisabled !== isDisabled) onToggleCollapsed();
    },
  }),
);
