import * as React from 'react';
import { HomeIcon, StripStockIcon } from 'src/assets/icons';
import { GridContainer, GridItem, Row } from 'src/components';

import { ProfileType } from '../components/profile-type/profile-type.component';

import { SelectProfileTypeProps } from './select-profile-type.types';

const BASIC_OPTIONS = ['one', 'two', 'three'];

const PICKUP_OPTIONS = ['one', 'two', 'three', 'four'];

const HOME_DELIVERY_OPTIONS = ['one', 'two', 'three'];

export const SelectProfileTypeComponent: React.StatelessComponent<
  SelectProfileTypeProps
> = ({ options, profileType, isLoading }) => {
  const PROFILES = [
    {
      id: 'basic',
      disabled: !options.hasBasic,
      profileListOptions: BASIC_OPTIONS,
      titleRoute: 'createPatient.stepOne.basic.title',
      descriptionRoute: 'createPatient.stepOne.basic.description',
      icon: StripStockIcon,
      optionsRoute: 'createPatient.stepOne.basic.options',
    },
    {
      id: 'pickup',
      disabled: !options.hasPickup,
      profileListOptions: PICKUP_OPTIONS,
      titleRoute: 'createPatient.stepOne.pickup.title',
      descriptionRoute: 'createPatient.stepOne.pickup.description',
      icon: StripStockIcon,
      optionsRoute: 'createPatient.stepOne.pickup.options',
    },
    {
      id: 'homeDelivery',
      disabled: !options.hasHomeDelivery,
      profileListOptions: HOME_DELIVERY_OPTIONS,
      titleRoute: 'createPatient.stepOne.homeDelivery.title',
      descriptionRoute: 'createPatient.stepOne.homeDelivery.description',
      icon: HomeIcon,
      optionsRoute: 'createPatient.stepOne.pickup.options',
    },
  ];

  if (isLoading) return <div>loading...</div>;
  return (
    <GridContainer>
      <GridItem span={12}>
        <Row>
          {PROFILES.map(
            (
              {
                id,
                disabled,
                profileListOptions,
                titleRoute,
                descriptionRoute,
                icon,
                optionsRoute,
              },
              idx,
            ) => (
              <ProfileType
                icon={icon}
                key={`${idx}-${id}`}
                id={id}
                disabled={disabled}
                profileListOptions={profileListOptions}
                profileType={profileType}
                titleRoute={titleRoute}
                descriptionRoute={descriptionRoute}
                optionsRoute={optionsRoute}
              />
            ),
          )}
        </Row>
      </GridItem>
    </GridContainer>
  );
};
