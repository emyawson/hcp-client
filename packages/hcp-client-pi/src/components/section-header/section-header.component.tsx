import * as React from 'react';
import { withTheme } from 'styled-components';

import { Keyline } from '@roche/patterns-indicators/components/keyline';
import { IThemeInterface } from '@roche/patterns-indicators/theme';

import {
  SectionHeaderDiv,
  SectionHeaderHeadline,
} from './section-header.style';

interface SectionHeaderProps {
  borderColor?: string;
  bottomMargin?: string;
  bottomMarginHeadline?: string;
  textColor?: string;
  theme: IThemeInterface;
  title?: string;
}
const SectionHeaderComponent = (props: SectionHeaderProps) => {
  const {
    borderColor = props.theme.colors.black,
    bottomMargin = '',
    bottomMarginHeadline = '',
    textColor = props.theme.colors.black,
    title = '',
  } = props;

  return (
    <SectionHeaderDiv bottomMargin={bottomMargin}>
      <SectionHeaderHeadline
        textColor={textColor}
        bottomMarginHeadline={bottomMarginHeadline}
      >
        {title}
      </SectionHeaderHeadline>
      <Keyline color={borderColor} />
    </SectionHeaderDiv>
  );
};

export const SectionHeader = withTheme(SectionHeaderComponent);
