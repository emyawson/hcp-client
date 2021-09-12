import React, { Component } from 'react';
import { compose } from 'recompose';

import { AsteriskIcon } from 'src/domains/diagnostics/assets/icons';
import { colors } from 'src/domains/diagnostics/styles';
import { RenderIf } from 'src/domains/diagnostics/utils';
import { withToolTip } from 'src/domains/diagnostics/utils/with-tool-tip';
import { ToolTip } from 'src/domains/diagnostics/components';

import { InfoTooltipContainer, TooltipContainer } from './info-tooltip.style';

const iconNormalSetting = {
  width: 14,
  height: 14,
  iconColor: colors.blueMarine,
  borderFillColor: 'transparent',
  borderColor: colors.blueMarine,
  withBorder: true,
};

const iconHoverSetting = {
  ...iconNormalSetting,
  iconColor: colors.white,
  borderFillColor: colors.blueMarine,
  borderColor: 'transparent',
};

class InfoTooltipBase extends Component {
  state = {
    hovered: false,
  };

  render() {
    const {
      info,
      toolTipYOffset = 0,
      toolTipXOffset = 0,
      toolTip,
    } = this.props;
    const { hovered } = this.state;

    const iconSetting = hovered ? iconHoverSetting : iconNormalSetting;

    return (
      <React.Fragment>
        <InfoTooltipContainer
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <AsteriskIcon {...iconSetting} />
        </InfoTooltipContainer>
        <RenderIf validate={toolTip.x && toolTip.y}>
          <ToolTip
            x={toolTip.x + toolTipXOffset}
            y={toolTip.y + toolTipYOffset}
          >
            <TooltipContainer>
              <span>{info}</span>
            </TooltipContainer>
          </ToolTip>
        </RenderIf>
      </React.Fragment>
    );
  }

  handleMouseEnter = event => {
    const { showToolTip, toolTipYOffset } = this.props;
    const { hovered } = this.state;
    showToolTip(event, null, toolTipYOffset);
    if (!hovered) {
      this.setState({ hovered: true });
    }
  };

  handleMouseLeave = event => {
    const { hideToolTip } = this.props;
    const { hovered } = this.state;
    hideToolTip();
    if (hovered) {
      this.setState({ hovered: false });
    }
  };
}

export const InfoTooltip = compose(withToolTip)(InfoTooltipBase);
