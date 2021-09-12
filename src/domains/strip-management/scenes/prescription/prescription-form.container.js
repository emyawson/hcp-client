import { compose, lifecycle, withHandlers, withProps } from 'recompose';
import { connect } from 'react-redux';
import { map, equals } from 'ramda';

import { mapDispatchers, addLocalFormDispatchHandlers } from 'src/utils';
import {
  getTherapiesRequest,
  getFrequenciesRequest,
  getClinicGuidesRequest,
  savePrescriptionRequest,
  updateQuantitiesAndPeriods,
  initializePrescription,
  setPrescriptionClinicGuideType,
  removeUnsavedPrescription,
  setClinicGuideFilter,
} from 'src/core/prescription';

import { prescriptionFormConnector } from './store';
import {
  selectQuantityMinById,
  selectQuantityMaxById,
  isCustomClinicGuide,
} from './prescription.utils';

import { PrescriptionForm } from '../../components';

const dispatchers = mapDispatchers({
  getTherapiesRequest: getTherapiesRequest.start,
  getFrequenciesRequest: getFrequenciesRequest.start,
  getClinicGuidesRequest: getClinicGuidesRequest.start,
  savePrescriptionRequest: savePrescriptionRequest.start,
  updateQuantitiesAndPeriods,
  initializePrescription,
  setPrescriptionClinicGuideType,
  removeUnsavedPrescription,
  setClinicGuideFilter,
});

const FIELDS_TO_RESET = [
  'therapy',
  'clinicGuide',
  'quantity',
  'frequency',
  'period',
];

const getClinicGuidesHandler = ({ id, getClinicGuidesRequest }) => value =>
  getClinicGuidesRequest({ id, therapyId: value });
const onClinicGuideDropdownChangeHandler = ({
  id,
  updateQuantitiesAndPeriods,
  updateValue,
  customClinicGuides,
  setPrescriptionClinicGuideType,
}) => clinicGuideId => {
  const activeFormCustomGuides = customClinicGuides[id];
  const isCustom = isCustomClinicGuide(clinicGuideId)(activeFormCustomGuides);
  setPrescriptionClinicGuideType({ id, isCustom });
  updateQuantitiesAndPeriods({ formId: id, clinicGuideId });
  map(field => updateValue(`${id}.${field}`, ''), ['quantity', 'period']);
};
const onSelectFilterHandler = ({
  id,
  updateValue,
  setClinicGuideFilter,
  updateQuantitiesAndPeriods,
}) => ({ filter }) => {
  setClinicGuideFilter({ formId: id, filter });
  map(field => updateValue(`${id}.${field}`, ''), [
    'quantity',
    'period',
    'clinicGuide',
  ]);
  updateQuantitiesAndPeriods({ formId: id, clinicGuideId: '' });
};
const onTherapyDropdownChangeHandler = ({
  getClinicGuides,
  id,
  updateValue,
}) => value => {
  getClinicGuides(value);
  map(field => updateValue(`${id}.${field}`, ''), ['quantity', 'period']);
};
const resetFieldsToSavedValueHandler = props => () => {
  const {
    id,
    getClinicGuides,
    updateValue,
    therapy,
    clinicGuide,
    updateQuantitiesAndPeriods,
  } = props;

  map(
    field => updateValue(`${id}.${field}`, props[field][id]),
    FIELDS_TO_RESET,
  );
  updateValue(`${id}.stripModel`, props.stripModel);
  updateQuantitiesAndPeriods({ formId: id, clinicGuideId: clinicGuide[id] });
  getClinicGuides(therapy[id]);
};
const onDatesChangeHandler = ({ updateValue, id }) => ({
  startDate,
  endDate,
}) => updateValue(`${id}.dateRange`, { startDate, endDate });

const onQuantityChangeHandler = ({ id, updateValue }) => value =>
  updateValue(`${id}.quantity`, value);

const submitHandler = ({ savePrescriptionRequest, patientId, id }) => values =>
  savePrescriptionRequest({
    patientId,
    prescription: values,
    prescriptionId: id,
  });

const addHandlers = Component =>
  compose(
    withHandlers({
      getClinicGuides: getClinicGuidesHandler,
    }),
    // handlers that require access of above
    withHandlers({
      // Handlers to clear dependent fields and call for options
      onClinicGuideDropdownChange: onClinicGuideDropdownChangeHandler,
      onTherapyDropdownChange: onTherapyDropdownChangeHandler,
      // Handler to reset prescription values to their saved values
      resetFieldsToSavedValue: resetFieldsToSavedValueHandler,
      onDatesChange: onDatesChangeHandler,
      handleSubmit: submitHandler,
      onQuantityChange: onQuantityChangeHandler,
      onSelectFilter: onSelectFilterHandler,
    }),
  )(Component);

const addQuantityRangeProps = Component =>
  withProps(({ id, quantities }) => ({
    quantityMax: selectQuantityMaxById(quantities, id),
    quantityMin: selectQuantityMinById(quantities, id),
  }))(Component);

const addLifecycle = Component =>
  compose(
    lifecycle({
      componentDidMount() {
        const {
          clinicId,
          departmentId,
          id,
          therapy,
          isTemporaryPrescription,
        } = this.props;
        this.props.initializePrescription({
          clinicId,
          departmentId,
          therapyId: therapy[id],
          formId: id,
          isTemporaryPrescription,
        });
      },
      componentWillReceiveProps(nextProps) {
        const { isCurrentlyDisplayed } = this.props;
        if (!equals(nextProps.isCurrentlyDisplayed, isCurrentlyDisplayed)) {
          this.props.resetFieldsToSavedValue();
        }
      },
      componentWillUnmount() {
        const { isUnsaved, id } = this.props;
        if (isUnsaved) {
          this.props.removeUnsavedPrescription(id);
        }
      },
    }),
  )(Component);

export const PrescriptionFormContainer = compose(
  connect(
    prescriptionFormConnector,
    dispatchers,
  ),
  addLocalFormDispatchHandlers,
  addQuantityRangeProps,
  addHandlers,
  addLifecycle,
)(PrescriptionForm);
