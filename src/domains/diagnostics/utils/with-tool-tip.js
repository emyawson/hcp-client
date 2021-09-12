import { compose, withState, withHandlers } from 'recompose';

// Higher Order Component that wraps tool-tip functionality to any component
export const withToolTip = compose(
  withState('toolTip', 'toggleToolTip', { x: null, y: null, data: {} }),
  withHandlers({
    showToolTip: ({ toggleToolTip }) => (event, data, toolTipWidth) => {
      const ySpacing = 5; // y spacing between cursor and corner of tool-tip
      const xSpacing = 8; // x spacing between cursor and corner of tool-tip
      const toolTipY = event.pageY + ySpacing;

      let toolTipX;

      // if width of tooltip is provided - make sure to not have it cut off when displayed at the edge of screen
      if (toolTipWidth) {
        toolTipX =
          event.pageX + toolTipWidth > window.innerWidth
            ? event.pageX - toolTipWidth - xSpacing
            : event.pageX + xSpacing;
      } else {
        toolTipX = event.pageX + xSpacing;
      }

      toggleToolTip({ x: toolTipX, y: toolTipY, data });
    },
    hideToolTip: ({ toggleToolTip }) => () => {
      toggleToolTip({ x: null, y: null, data: {} });
    },
  }),
);
