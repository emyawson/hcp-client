import React from 'react';
import { translate } from 'react-i18next';

import { StyledLocalize } from './localized-text.style';

export const Localized = ({ t, textKey = '', values, ...props }) => (
  <StyledLocalize {...props}>{t(textKey, values)} </StyledLocalize>
);

export const LocalizedText = translate('translations')(Localized);
LocalizedText.displayName = 'LocalizedText';
