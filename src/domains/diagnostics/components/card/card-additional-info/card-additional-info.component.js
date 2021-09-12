import * as React from 'react';

type Props = {
  children?: React.Node,
};

export const CardAdditionalInfo = ({ children }: Props) => (
  <span>{children}</span>
);

CardAdditionalInfo.defaultProps = {
  children: [],
};
