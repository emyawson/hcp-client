import React from 'react';

import {
  Checkbox,
  Popover,
  CardMinimizer,
} from 'src/domains/diagnostics/components';
import { colors } from 'src/domains/diagnostics/styles';
import {
  CrossMarkIcon,
  GearIcon,
  RectangleMarkIcon,
  ConnectingLinesIcon,
  MeanBloodGlucoseIcon,
  GridIcon,
} from 'src/domains/diagnostics/assets/icons';
import { translate } from 'src/i18n'; // TODO: move to diagnostics
import { RenderIf } from 'src/domains/diagnostics/utils';

import {
  CheckboxContainer,
  CheckboxesForm,
  GearIconContainer,
  GraphOptionsContainer,
  PopoverContentContainer,
  SVGContainer,
} from './graph-options.style';

export class GraphOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopover: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const {
      bloodGlucoseToggle = false,
      bgBeforeMealToggle = false,
      bgAfterMealToggle = false,
      meanBloodGlucoseToggle = false,
      connectingLinesToggle = false,
      gridLinesToggle = false,
      match,
    } = this.props;

    const atLeastOneToggleIsTrue =
      bloodGlucoseToggle ||
      bgBeforeMealToggle ||
      bgAfterMealToggle ||
      meanBloodGlucoseToggle ||
      connectingLinesToggle ||
      gridLinesToggle;

    return (
      <GraphOptionsContainer innerRef={comp => this.setWrapperRef(comp)}>
        <GearIconContainer
          onClick={() =>
            this.setState({ showPopover: !this.state.showPopover })
          }
        >
          <GearIcon />
        </GearIconContainer>
        <RenderIf validate={atLeastOneToggleIsTrue}>
          <Popover
            backgroundColor={colors.white}
            pushLeft={16}
            pushArrowLeft={0.2}
            show={this.state.showPopover}
            width={20}
          >
            <PopoverContentContainer>
              <CheckboxesForm model="ui.patientDashboard">
                <RenderIf validate={bloodGlucoseToggle}>
                  <CheckboxContainer>
                    <Checkbox
                      id={translate('graphs.detailGraph.bloodGlucose')}
                      label={
                        <React.Fragment>
                          <SVGContainer>
                            <CrossMarkIcon />
                          </SVGContainer>
                          {translate('graphs.detailGraph.bloodGlucose')}
                        </React.Fragment>
                      }
                      labelBeforeCheckbox
                      modelPath=".showBloodGlucosePoints"
                      size={20}
                    />
                  </CheckboxContainer>
                </RenderIf>
                <RenderIf validate={bgBeforeMealToggle}>
                  <CheckboxContainer>
                    <Checkbox
                      id={translate('graphs.detailGraph.bgBeforeMeal')}
                      label={
                        <React.Fragment>
                          <SVGContainer>
                            <RectangleMarkIcon fillColor={colors.white} />
                          </SVGContainer>
                          {translate('graphs.detailGraph.bgBeforeMeal')}
                        </React.Fragment>
                      }
                      labelBeforeCheckbox
                      modelPath=".showBloodGlucoseBeforeMealPoints"
                      size={20}
                    />
                  </CheckboxContainer>
                </RenderIf>
                <RenderIf validate={bgAfterMealToggle}>
                  <CheckboxContainer>
                    <Checkbox
                      id={translate('graphs.detailGraph.bgAfterMeal')}
                      label={
                        <React.Fragment>
                          <SVGContainer>
                            <RectangleMarkIcon />
                          </SVGContainer>
                          {translate('graphs.detailGraph.bgAfterMeal')}
                        </React.Fragment>
                      }
                      labelBeforeCheckbox
                      modelPath=".showBloodGlucoseAfterMealPoints"
                      size={20}
                    />
                  </CheckboxContainer>
                </RenderIf>
                <RenderIf validate={meanBloodGlucoseToggle}>
                  <CheckboxContainer>
                    <Checkbox
                      id={translate('graphs.detailGraph.meanBloodGlucose')}
                      label={
                        <React.Fragment>
                          <SVGContainer>
                            <MeanBloodGlucoseIcon />
                          </SVGContainer>
                          {translate('graphs.detailGraph.meanBloodGlucose')}
                        </React.Fragment>
                      }
                      labelBeforeCheckbox
                      modelPath=".showMeanBloodGlucose"
                      size={20}
                    />
                  </CheckboxContainer>
                </RenderIf>
                <RenderIf validate={connectingLinesToggle}>
                  <CheckboxContainer>
                    <Checkbox
                      id={translate('graphs.detailGraph.connectingLines')}
                      label={
                        <React.Fragment>
                          <SVGContainer>
                            <ConnectingLinesIcon />
                          </SVGContainer>
                          {translate('graphs.detailGraph.connectingLines')}
                        </React.Fragment>
                      }
                      labelBeforeCheckbox
                      modelPath=".showBloodGlucoseLines"
                      size={20}
                    />
                  </CheckboxContainer>
                </RenderIf>
                <RenderIf validate={gridLinesToggle}>
                  <CheckboxContainer>
                    <Checkbox
                      id={translate('graphs.detailGraph.gridLines')}
                      label={
                        <React.Fragment>
                          <SVGContainer>
                            <GridIcon />
                          </SVGContainer>
                          {translate('graphs.detailGraph.gridLines')}
                        </React.Fragment>
                      }
                      labelBeforeCheckbox
                      modelPath=".showGridLines"
                      size={20}
                    />
                  </CheckboxContainer>
                </RenderIf>
              </CheckboxesForm>
            </PopoverContentContainer>
          </Popover>
        </RenderIf>
        <CardMinimizer link={`/patients/${match.params.id}`} />
      </GraphOptionsContainer>
    );
  }

  wrapperRef;

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showPopover: false });
    }
  };
}
