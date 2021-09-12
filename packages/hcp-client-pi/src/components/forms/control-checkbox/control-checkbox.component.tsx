import * as React from 'react';
import { Control } from 'react-redux-form';

import { ToggleSwitchInputProps } from '@roche/patterns-indicators/components';

export class ControlCheckbox extends React.Component<
  ToggleSwitchInputProps,
  any
> {
  public render() {
    const { modelPath } = this.props;
    return <Control.checkbox model={modelPath} {...this.props} />;
  }
}
