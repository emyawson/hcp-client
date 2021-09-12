import styled from 'styled-components';

import { colors, spacing, fontSize } from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';

const customMedium = '1379px';

export const BGCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

BGCardContainer.displayName = 'BGCardContainer';

export const BGRow = styled.div`
  display: flex;
  flex: 1.3;
  align-items: center;
  width: 100%;

  &:first-child {
    flex: 1.7;
    background-color: ${colors.blueMarineAlpha};
  }
`;

BGRow.displayName = 'BGRow';

export const BGTestsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    border-right: 0.125rem solid ${colors.quartzBlue};
  }
`;

BGTestsContainer.displayName = 'BGTestsContainer';

export const BGTestsData = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: max-content;
`;

BGTestsData.displayName = 'BGTestsData';

export const BGTestText = styled.div`
  display: flex;
  font-family: 'Nunito', sans-serif;
  font-size: ${fontSize.display2};
  font-weight: ${weight.semiBold};
  color: ${colors.blueMarine};

  @media (max-width: ${customMedium}) {
    font-size: ${fontSize.display1};
  }
`;

BGTestText.displayName = 'BGTestText';

export const BGTestTextSmall = styled.div`
  display: flex;

  font-size: ${fontSize.caption};
  font-weight: ${weight.bold};
  color: ${colors.grayDark};
  line-height: 0.92;
  letter-spacing: normal;
  text-transform: uppercase;
`;

BGTestTextSmall.displayName = 'BGTestTextSmall';

export const BGStatsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  &:first-child {
    border-right: 0.0625rem solid ${colors.grayLighter};
  }

  @media (max-width: ${customMedium}) {
    flex-direction: column;
  }
`;

BGStatsContainer.displayName = 'BGStatsContainer';

export const BGData = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0 ${spacing.two};

  @media (max-width: ${customMedium}) {
    flex-flow: row;
    width: 100%;
    margin: 0 0 ${spacing.two};
    justify-content: center;
    align-items: center;
  }
`;

BGData.displayName = 'BGData';

export const BGDataPoint = styled.div`
  font-size: ${fontSize.headline};
  font-weight: ${weight.semiBold};
  line-height: 1;
  letter-spacing: normal;
  color: ${colors.charcoal};

  @media (max-width: ${customMedium}) {
    margin-right: ${spacing.one};
    font-size: ${fontSize.subheading};
  }
`;

BGDataPoint.displayName = 'BGDataPoint';

export const BGUnits = styled.div`
  font-size: ${fontSize.caption};
  font-weight: normal;
  line-height: 1;
  letter-spacing: normal;
  color: ${colors.grayMedium};
  text-align: center;
`;

BGUnits.displayName = 'BGUnits';

export const BGTitle = styled.div`
  font-size: ${fontSize.caption};
  font-weight: ${weight.bold};
  font-style: normal;
  color: ${colors.grayDark};
  line-height: 1.42;
  letter-spacing: normal;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  text-align: center;

  & span {
    width: 5.1rem;
  }

  @media (max-width: ${customMedium}) {
    width: 100%;
    justify-content: center;
  }
`;

BGTitle.displayName = 'BGTitle';
