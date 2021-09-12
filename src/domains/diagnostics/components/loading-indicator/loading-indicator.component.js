import React from 'react';
import { range } from 'ramda';

import { spacing } from 'src/domains/diagnostics/styles';

import {
  LoadingIndicatorSpan,
  LoadingIndicatorMarkerSpan,
} from './loading-indicator.style';

export const LoadingIndicator = ({
  animation = 'bounce',
  size = spacing.three,
}) => {
  const markerIcon = '●';
  const markerIcons = 3;
  const renderMarkers = () =>
    range(0, markerIcons).map(markerIndex => (
      <LoadingIndicatorMarkerSpan
        animation={animation}
        size={size}
        key={`LoadingIndicatorMarker-${markerIndex}`}
      >
        {markerIcon}
      </LoadingIndicatorMarkerSpan>
    ));
  return (
    <LoadingIndicatorSpan size={size}>{renderMarkers()}</LoadingIndicatorSpan>
  );
};
