import * as React from 'react';
import { ControlRadio, InputRadio } from 'src/components/forms';
import { ProfileTypes } from 'src/core/department/department.types';
import { translate } from 'src/i18n';
import { hasValue } from 'src/utils';

import { PatientFormModel } from '../../forms.types';
import { SelectProfileListItem } from '../select-profile-list-item/select-profile-list-item.component';

import {
  ProfileBottomContainer,
  ProfileLabel,
  ProfileTopContainer,
  ProfileTypeDescription,
  ProfileTypeDiv,
  ProfileTypeTitle,
  SelectProfileListContainer,
} from './profile-type.styles';
import { ProfileTypeProps } from './profile-type.types';

export const ProfileType: React.StatelessComponent<ProfileTypeProps> = ({
  id,
  profileType,
  profileListOptions,
  disabled,
  titleRoute,
  descriptionRoute,
  icon,
  optionsRoute,
}) => {
  const options = profileListOptions.map(optionString =>
    translate(`${optionsRoute}.${[optionString]}`),
  );
  const selected = ProfileTypes[id] === profileType;
  const Icon = icon;
  return (
    <ProfileTypeDiv selected={selected} disabled={disabled}>
      <ProfileLabel htmlFor={id} disabled={disabled}>
        <ProfileTopContainer>
          <Icon height={60} />
          <ProfileTypeTitle selected={selected}>
            {translate(titleRoute)}
          </ProfileTypeTitle>
          <ProfileTypeDescription>
            {translate(descriptionRoute)}
          </ProfileTypeDescription>
          <SelectProfileListContainer>
            {options.map((option, idx) => (
              <SelectProfileListItem key={`${idx}-${option}`}>
                {option}
              </SelectProfileListItem>
            ))}
          </SelectProfileListContainer>
        </ProfileTopContainer>
        <ProfileBottomContainer>
          <ControlRadio
            component={InputRadio}
            id={id}
            name="profileType"
            value={ProfileTypes[id]}
            key={id}
            model={PatientFormModel.profileType}
            disabled={disabled}
            validators={{ isRequired: hasValue }}
            mapProps={{
              id,
            }}
          />
        </ProfileBottomContainer>
      </ProfileLabel>
    </ProfileTypeDiv>
  );
};
