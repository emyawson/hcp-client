import * as React from 'react';

import {
  configDetails,
  translationText,
  validationConfig,
} from '@roche/patterns-indicators/constants/form-config.constants';

import { AlertSettingsContainer } from '@roche/patterns-indicators/domains/alert-settings';
import { PiProfileSetupContainer } from '@roche/patterns-indicators/domains/pi-profile-setup';

import {
  AlertSettingsContainerWrapper,
  ConfigurationsContainer,
} from './configurations.style';

export interface ConfigurationsProps {
  profileType?: string;
  toggleDisplay: () => void;
}
export const Configurations = ({ toggleDisplay }: ConfigurationsProps) => {
  return (
    <ConfigurationsContainer>
      <PiProfileSetupContainer toggleDisplay={toggleDisplay}>
        <AlertSettingsContainerWrapper>
          <AlertSettingsContainer
            configDetails={configDetails}
            translationText={translationText}
            validationConfig={validationConfig}
          />
        </AlertSettingsContainerWrapper>
      </PiProfileSetupContainer>
    </ConfigurationsContainer>
  );
};
