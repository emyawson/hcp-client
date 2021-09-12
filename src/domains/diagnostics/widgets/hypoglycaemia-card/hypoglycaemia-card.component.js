import React from 'react';

import { LocalizedText, weight } from 'src/domains/diagnostics/components';
import { withGraphLoader } from 'src/domains/diagnostics/utils';
import { translate } from 'src/i18n';
import { SIZE } from 'src/domains/diagnostics/components/no-data-disclaimer';

import {
  Container,
  Row,
  Text,
  Block,
  BlockMain,
  Separator,
} from './hypoglycaemia-card.style';

const HypoglycaemiaCardWithLoader = withGraphLoader(
  Container,
  translate('general.loading'),
  { size: SIZE.SMALL },
);

export const HypoglycaemiaCard = ({
  hypoglycaemiaTreshold,
  hypoglycaemiaCount,
  hypoglycaemiaNightCount,
  isLoading,
  hasData,
}) => (
  <HypoglycaemiaCardWithLoader isLoading={isLoading} hasError={!hasData}>
    <Row flex={1.7} blueBG flexDirection={'column'}>
      <Block flex={1.6} alignItems={'flex-end'}>
        <LocalizedText
          textStyle={'caps'}
          textKey={'dashboard.hypoglycaemiaCard.hypoLimit'}
          fontSize={1}
        />
      </Block>
      <BlockMain flex={2.6}>
        <Text fontSize={7}>{hypoglycaemiaTreshold}</Text>
      </BlockMain>
      <Block flex={1.6} pt={2} alignItems={'flex-start'}>
        <LocalizedText textKey={'general.units.mgPerDL'} fontSize={2} />
      </Block>
    </Row>
    <Row flex={1.3} justifyContent={'center'} alignItems={'center'}>
      <Block flexDirection={'column'} flex={1}>
        <Block pb={1}>
          <Text fontSize={3} fontWeight={weight.semiBold}>
            {hypoglycaemiaCount}
          </Text>
        </Block>
        <Block>
          <LocalizedText
            textStyle={'caps'}
            textKey={'dashboard.hypoglycaemiaCard.hypoglycaemia'}
            fontSize={1}
            fontWeight={weight.semiBold}
          />
        </Block>
      </Block>
      <Separator />
      <Block flexDirection={'column'} flex={1}>
        <Block pb={1}>
          <Text fontSize={3} fontWeight={weight.semiBold}>
            {hypoglycaemiaNightCount}
          </Text>
        </Block>
        <Block>
          <LocalizedText
            textStyle={'caps'}
            textKey={'dashboard.hypoglycaemiaCard.hypoAtNight'}
            fontSize={1}
            fontWeight={weight.semiBold}
          />
        </Block>
      </Block>
    </Row>
  </HypoglycaemiaCardWithLoader>
);
