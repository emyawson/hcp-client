import React from 'react';

// import { StackedRadialChart } from "src/domains/diagnostics/components";
import { translate } from 'src/i18n';
// import { colors } from "src/domains/diagnostics/styles";
import { InsulinDetailsContainer } from 'src/domains/diagnostics/widgets';
import { HeaderCard } from 'src/domains/diagnostics/components/graph';
import { withGraphLoader } from 'src/domains/diagnostics/utils';

import {
  // RadialChartContainerDiv,
  // RadialChartBlockDiv,
  // DetailRow,
  DetailSection,
  DetailWrapperDiv,
  BasalRateSection,
  BasalRateContent,
} from './insulin.style';
// import { formatDecimalAsPercentage } from "./utils";
import {
  // DetailBlock,
  BolusTable,
  // BasalRateTable
} from './components';

const BasalRateContentWithLoader = withGraphLoader(
  BasalRateContent,
  translate('graphs.insulin.loading'),
);

export const Insulin = ({
  advisedBolus,
  advisedBolusSegments,
  basalRateTableData,
  bolusTableData,
  hasData,
  patient,
  isLoading,
}) => (
  // For temporarily removed bolus advice section
  // const {
  //   acceptedAdvised,
  //   modifiedAdvised,
  //   uncalculatedAdvised,
  //   totalAdvised,
  // } = advisedBolus;

  <BasalRateSection>
    <HeaderCard
      title={translate('graphs.insulin.basalBolusTitle')}
      noPaddingTop
      noMarginTop
    />
    <BasalRateContentWithLoader isLoading={isLoading} hasError={!hasData}>
      <DetailSection>
        <DetailWrapperDiv>
          <InsulinDetailsContainer />
        </DetailWrapperDiv>
        <BolusTable bolusTableData={bolusTableData} />
      </DetailSection>

      {/* Bolus Advice and Basal Profile sections are temporarily removed for release 1.0.
        The logic for these sections needs to be updated */}
      {/* <HeaderCard title={translate("graphs.insulin.bolusAdvice")} />
        <DetailSection>
          <DetailWrapperDiv>
            <DetailRow>
              <RadialChartBlockDiv>
                <RadialChartContainerDiv>
                  <StackedRadialChart
                    diameter={10}
                    segments={advisedBolusSegments}
                  />
                </RadialChartContainerDiv>
              </RadialChartBlockDiv>
              <DetailBlock
                flex={1}
                primaryTitle={translate("graphs.insulin.acceptedBolus")}
                secondaryTitle={acceptedAdvised}
                value={formatDecimalAsPercentage(
                  acceptedAdvised / totalAdvised,
                )}
                circleFill={colors.blueMarine}
              />
              <DetailBlock
                flex={1}
                primaryTitle={translate("graphs.insulin.modifiedBolus")}
                secondaryTitle={modifiedAdvised}
                value={formatDecimalAsPercentage(
                  modifiedAdvised / totalAdvised,
                )}
                circleFill={colors.blueVeryLight}
              />
              <DetailBlock
                flex={1}
                primaryTitle={translate("graphs.insulin.withoutCalculator")}
                secondaryTitle={uncalculatedAdvised}
                value={formatDecimalAsPercentage(
                  uncalculatedAdvised / totalAdvised,
                )}
                circleFill={colors.silverMedium}
              />
              <DetailBlock
                flex={1}
                primaryTitle={translate("graphs.insulin.measurements")}
                value={totalAdvised}
              />
            </DetailRow>
          </DetailWrapperDiv>
          <BasalRateTable basalRateTableData={basalRateTableData} />
        </DetailSection> */}
    </BasalRateContentWithLoader>
  </BasalRateSection>
);
