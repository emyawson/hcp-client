import React from 'react';

import { colors, fontSize } from 'src/domains/diagnostics/styles';
import {
  LOGBOOK_TYPE_STATS,
  LOGBOOK_TYPE_DIARY,
  LOGBOOK_TYPE_DETAILS,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import { Button } from 'src/domains/diagnostics/components';
import { translate } from 'src/i18n'; // TODO: move to diagnostics
import { DisclaimerIcon } from 'src/domains/diagnostics/assets/icons';
import { RenderIf } from 'src/domains/diagnostics/utils';

import {
  ChangeTypeContainerDiv,
  ChangeTypeButton,
  GraphSettingsRowContainerDiv,
  GraphSettingsWrapper,
  LogbookSettingsRowContainerDiv,
  CardSectionTitleDiv,
} from './graph-settings-row.style';

import {
  LineGraphIcon,
  BoxGraphIcon,
  LogbookStatsIcon,
  LogbookDiaryIcon,
  LogbookIcon,
} from '../../assets/icons';

type Props = {
  graphType: GraphType,
  logbookType: LogbookType,
  changeGraphType: GraphType => void,
  changeLogbookType: LogbookType => void,
  onDatesChange: (startDate: Date, endDate: Date) => void,
  startDate?: Date,
  endDate?: Date,
};

const renderChangeTypeButtons = (graphType, changeGraphType) => (
  <ChangeTypeContainerDiv>
    <ChangeTypeButton
      active={graphType === 'details'}
      onClick={() => changeGraphType('details')}
    >
      <LineGraphIcon
        fillColor={graphType === 'details' ? colors.white : colors.grayDark}
        height={18}
      />
    </ChangeTypeButton>
    <ChangeTypeButton
      active={graphType === 'trend'}
      onClick={() => changeGraphType('trend')}
    >
      <BoxGraphIcon
        fillColor={graphType === 'trend' ? colors.white : colors.grayDark}
        height={18}
      />
    </ChangeTypeButton>
  </ChangeTypeContainerDiv>
);

const renderChangeTypeButtonsLogbook = (logbookType, changeLogbookType) => (
  <ChangeTypeContainerDiv>
    <ChangeTypeButton
      active={logbookType === LOGBOOK_TYPE_DETAILS}
      onClick={() => changeLogbookType(LOGBOOK_TYPE_DETAILS)}
    >
      <LogbookIcon
        fillColor={
          logbookType === LOGBOOK_TYPE_DETAILS ? colors.white : colors.grayDark
        }
        height={18}
      />
    </ChangeTypeButton>
    <ChangeTypeButton
      active={logbookType === LOGBOOK_TYPE_DIARY}
      onClick={() => changeLogbookType(LOGBOOK_TYPE_DIARY)}
    >
      <LogbookDiaryIcon
        fillColor={
          logbookType === LOGBOOK_TYPE_DIARY ? colors.white : colors.grayDark
        }
        height={18}
      />
    </ChangeTypeButton>
    <ChangeTypeButton
      active={logbookType === LOGBOOK_TYPE_STATS}
      onClick={() => changeLogbookType(LOGBOOK_TYPE_STATS)}
    >
      <LogbookStatsIcon
        fillColor={
          logbookType === LOGBOOK_TYPE_STATS ? colors.white : colors.grayDark
        }
        height={18}
      />
    </ChangeTypeButton>
  </ChangeTypeContainerDiv>
);

export const LogbookSettingsRowComponent = (props: Props) => {
  const {
    logbookType,
    changeLogbookType,
    absolutePosition,
    onClickDisclaimer,
  } = props;
  return (
    <GraphSettingsWrapper
      absolutePosition={absolutePosition}
      top="6rem"
      alignItems="center"
    >
      <Button
        label={translate('general.disclaimers')}
        fontSize={fontSize.subheading}
        fontWeight="bold"
        mr={3}
        buttonStyle="info"
        onClick={onClickDisclaimer}
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
      <LogbookSettingsRowContainerDiv>
        {renderChangeTypeButtonsLogbook(logbookType, changeLogbookType)}
      </LogbookSettingsRowContainerDiv>
    </GraphSettingsWrapper>
  );
};

export const GraphSettingsRowComponent = (props: Props) => {
  const { graphType, changeGraphType, showChangeGraphToggle, children } = props;
  return (
    <GraphSettingsWrapper>
      <RenderIf validate={showChangeGraphToggle}>
        <CardSectionTitleDiv>{graphType}</CardSectionTitleDiv>
        <GraphSettingsRowContainerDiv>
          {renderChangeTypeButtons(graphType, changeGraphType)}
        </GraphSettingsRowContainerDiv>
      </RenderIf>
      {children}
    </GraphSettingsWrapper>
  );
};
