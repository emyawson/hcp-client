import * as React from 'react';

import { Badge } from 'src/components/badge';
import { XIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles';

type ErrorBadgeProps = {
  size: number;
};

export const calculateIconHeightFromBadgeSize = (size: number): number =>
  size * 0.38;

export const ErrorBadge: React.StatelessComponent<ErrorBadgeProps> = ({
  size,
}) => (
  <Badge
    bgColor={colors.trafficRed}
    icon={<XIcon height={calculateIconHeightFromBadgeSize(size)} />}
    size={size}
    emptyInnerCircle={false}
    disabled={false}
  />
);
