import styled from 'styled-components';

import { colors, spacing, fontSize } from 'src/core';
import { convertPxToRem, hasValue } from 'src/utils';
import { COLLAPSED_STD_GRAPH_HEIGHT_IN_REM } from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import { GRAPHS } from 'src/domains/diagnostics/scenes/graphs';

export const PatientInfoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: ${colors.charcoal};
  font-size: ${fontSize.subheading};

  li {
    padding: ${spacing.two} 0 0;
    display: flex;
    align-items: center;
  }
`;

PatientInfoList.displayName = 'PatientInfoList';

const FlexCenterDiv = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const ImgWrapperDiv = FlexCenterDiv.extend``;

ImgWrapperDiv.displayName = 'ImgWrapperDiv';

export const HypoGraphImg = styled.img`
  height: ${convertPxToRem(138)};
  padding-right: ${spacing.four};
`;

HypoGraphImg.displayName = 'HypoGraphImg';

export const PatientDataWrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: -1rem;
`;

PatientDataWrapperDiv.displayName = 'PatientDataWrapperDiv';

export const BGstatusList = styled(PatientInfoList)`
  width: 100%;
  li {
    width: 100%;
    padding: 0 0 ${spacing.three} 0;
    display: flex;
  }
`;

BGstatusList.displayName = 'BGstatusList';

export const BGStatusAlertDiv = styled.div`
  height: 1.5rem;
  min-width: 1.5rem;
  border-radius: 1rem;
  background-color: ${props =>
    hasValue(props.color) ? props.color : 'transparent'};
  margin-right: ${spacing.two};
`;

BGStatusAlertDiv.displayName = 'BGStatusAlertDiv';

export const BGstatImg = styled.img`
  width: 100%;
  max-width: ${convertPxToRem(288)};
`;

BGstatImg.displayName = 'BGstatImg';

export const DevicesImg = styled.img`
  width: 100%;
  max-width: ${convertPxToRem(375)};
`;

DevicesImg.displayName = 'DevicesImg';

export const LogbookWrapper = styled.div`
  position: relative;
  height: ${props =>
    props.collapsed ? COLLAPSED_STD_GRAPH_HEIGHT_IN_REM : 'inherit'};
  min-height: ${props =>
    props.collapsed ? COLLAPSED_STD_GRAPH_HEIGHT_IN_REM : 'inherit'};
  min-width: ${convertPxToRem(820)};
`;

LogbookWrapper.displayName = 'LogbookWrapper';

export const GraphContainerDiv = styled.div`
  display: ${props => (props.graph === GRAPHS.INSULIN ? 'flex' : null)};
  min-height: ${COLLAPSED_STD_GRAPH_HEIGHT_IN_REM};
  max-height: ${COLLAPSED_STD_GRAPH_HEIGHT_IN_REM};
  justify-content: ${props => props.graph === GRAPHS.INSULIN && 'center'};
`;

GraphContainerDiv.displayName = 'GraphContainerDiv';

export const PatientPermissionsLoaderDiv = FlexCenterDiv.extend`
  min-height: ${COLLAPSED_STD_GRAPH_HEIGHT_IN_REM};
  padding: ${props => props.theme.spacing.three};
`;
PatientPermissionsLoaderDiv.displayName = 'PatientPermissionsLoaderDiv';
