export type SelectProfileTypeExternalProps = {};

export type SelectProfileTypeMappedFromDispatch = {};

export type SelectProfileTypePropsMappedFromState = {
  isLoading?: boolean;
  profileType: string;
  options: {
    hasHomeDelivery?: boolean;
    hasPickup?: boolean;
    hasBasic?: boolean;
  };
  disabled?: boolean;
};
export type SelectProfileTypeProps = SelectProfileTypeExternalProps &
  SelectProfileTypePropsMappedFromState &
  SelectProfileTypeMappedFromDispatch;
