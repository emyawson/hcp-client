import React from 'react';

import { translate } from 'src/i18n';

import {
  GuideSummaryCardWrapperDiv,
  CustomGuideHeader,
  CustomGuideSubheadingWrapperDiv,
  CustomGuideInfoSubheading,
  CustomGuideLabelSubheading,
  CustomGuideSubheadingsRowDiv,
} from './custom-clinic-guide-summary.style';

const datePlaceholder = 'June 20 2018';

export const CustomClinicGuideSummary = ({
  name,
  ownerName,
  date = datePlaceholder,
}) => (
  <GuideSummaryCardWrapperDiv>
    <CustomGuideHeader>{name}</CustomGuideHeader>

    <CustomGuideSubheadingsRowDiv>
      <CustomGuideSubheadingWrapperDiv>
        <CustomGuideLabelSubheading>{`${translate(
          'prescription.customClinicGuides.owner',
        )} -`}</CustomGuideLabelSubheading>
        <CustomGuideInfoSubheading>{ownerName}</CustomGuideInfoSubheading>
      </CustomGuideSubheadingWrapperDiv>

      <CustomGuideSubheadingWrapperDiv>
        <CustomGuideLabelSubheading>{`${translate(
          'prescription.customClinicGuides.date',
        )}:`}</CustomGuideLabelSubheading>
        <CustomGuideInfoSubheading>{date}</CustomGuideInfoSubheading>
      </CustomGuideSubheadingWrapperDiv>
    </CustomGuideSubheadingsRowDiv>
  </GuideSummaryCardWrapperDiv>
);
