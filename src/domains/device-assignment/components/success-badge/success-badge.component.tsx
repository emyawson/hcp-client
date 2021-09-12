import * as React from 'react';

import { CheckmarkIcon } from 'src/assets/icons';
import { Badge } from 'src/components/badge';
import { colors } from 'src/core/styles';

type SuccessBadgeProps = {
  size: number;
};

export const calculateIconHeightFromBadgeSize = (size: number): number =>
  size * 0.42;

export const SuccessBadge: React.StatelessComponent<SuccessBadgeProps> = ({
  size,
}) => (
  <Badge
    bgColor={colors.trafficGreen}
    icon={<CheckmarkIcon height={calculateIconHeightFromBadgeSize(size)} />}
    size={size}
    emptyInnerCircle={false}
    disabled={false}
  />
);
