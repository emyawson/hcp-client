import { isEmpty, last, split } from 'ramda';
import React, { Component } from 'react';

import {
  Tabs,
  Block,
  TabLinkItemSmall,
  TabsHeaderSmall,
  TabsContent,
  LocalizedText,
  Button,
} from 'src/domains/diagnostics/components';
import { colors, fontSize } from 'src/domains/diagnostics/styles';
import { RenderIf } from 'src/domains/diagnostics/utils/render-if';
import { translate } from 'src/i18n'; // TODO: move to diagnostics
import { DisclaimerIcon } from 'src/domains/diagnostics/assets/icons';
import { withGraphLoader } from 'src/domains/diagnostics/utils';
import { BloodGlucoseGeneralStatsSection } from 'src/domains/diagnostics/widgets/blood-glucose-general-stats/blood-glucose-general-stats.style';

const TabsWithLoader = withGraphLoader(Tabs, translate('general.loading'));

export class BloodGlucoseGeneralStats extends Component {
  componentDidMount() {
    // if the link refers back to the BG Stats Dashboard Card,
    // jump to the top of the window, otherwise stay at the same level as
    // the rest of the graphs.
    if (last(split('/', this.props.location.pathname)) === 'devices') {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { isLoading, hasData } = this.props;
    return (
      <BloodGlucoseGeneralStatsSection>
        <LocalizedText
          textKey={'bloodGlucoseStats.bloodGlucoseGeneralStatsTitle'}
          fontSize={5}
          pl={2}
          color={colors.charcoal}
        />
        <TabsWithLoader isLoading={isLoading} hasError={!hasData}>
          <Block display="flex" justifyContent="space-between">
            <TabsHeaderSmall>
              <RenderIf validate={!isEmpty(this.props.deviceDetails)}>
                <TabLinkItemSmall
                  path="all"
                  name={translate('devices.allDevicesTitle')}
                />
                {this.props.deviceDetails.map((device, index) => (
                  <TabLinkItemSmall
                    exact
                    path={device.id}
                    name={device.name}
                    key={index}
                  />
                ))}
              </RenderIf>
            </TabsHeaderSmall>
            <Button
              label={translate('general.disclaimers')}
              fontSize={fontSize.subheading}
              fontWeight="bold"
              buttonStyle="info"
              onClick={this.props.onClickDisclaimer}
              icon={
                <DisclaimerIcon
                  height="17"
                  withBorder
                  iconColor={colors.white}
                  borderFillColor={colors.blueMarine}
                  borderColor={colors.transparent}
                />
              }
            />
          </Block>
          <TabsContent>{this.props.children}</TabsContent>
        </TabsWithLoader>
      </BloodGlucoseGeneralStatsSection>
    );
  }
}
