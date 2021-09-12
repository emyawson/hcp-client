import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { hasValue, mapDispatchers } from 'src/utils';
import { addLocalFormDispatchHandlers } from 'src/utils/forms';
import {
  getFrequenciesRequest,
  getStripModelsRequest,
  getTherapiesRequest,
  saveClinicGuideRequest,
} from 'src/core/prescription/prescription.actions';

import { CustomClinicGuidesForm } from './custom-clinic-guides-form.component';
import { customClinicGuidesFormConnector } from './store';
import { CREATE_CUSTOM_GUIDE_FORM_ID } from './store/custom-clinic-guides.constants';

const dispatchers = mapDispatchers({
  getFrequenciesRequest: getFrequenciesRequest.start,
  getStripModelsRequest: getStripModelsRequest.start,
  getTherapiesRequest: getTherapiesRequest.start,
  saveClinicGuideRequest: saveClinicGuideRequest.start,
});

const onQuantitySliderChangeHandler = ({ updateValue }) => ({ min, max }) =>
  updateValue(`${CREATE_CUSTOM_GUIDE_FORM_ID}.quantityRange`, { min, max });

const onSubmitSaveClinicGuideHandler = ({ saveClinicGuideRequest }) => ({
  name,
  therapyId,
  period,
  quantityRange: { min, max },
}) =>
  saveClinicGuideRequest({
    name,
    therapyId,
    period,
    minimumStrips: min,
    maximumStrips: max,
  });

const addHandlers = withHandlers({
  onQuantitySliderChange: onQuantitySliderChangeHandler,
  onSubmitSaveClinicGuide: onSubmitSaveClinicGuideHandler,
});

const addTherapiesLifecycle = lifecycle({
  componentDidMount() {
    const { getTherapiesRequest, therapies } = this.props;
    if (!hasValue(therapies)) {
      getTherapiesRequest();
    }
  },
});

export const CustomClinicGuidesFormContainer = compose(
  connect(
    customClinicGuidesFormConnector,
    dispatchers,
  ),
  addTherapiesLifecycle,
  addLocalFormDispatchHandlers,
  addHandlers,
)(CustomClinicGuidesForm);
