import * as React from 'react';

export type BaseWrapperProps = {
  children?: React.ReactNode;
  onClick?: () => any;
};

export type BaseStyleProps = BaseWrapperProps & {
  className?: string;
};
