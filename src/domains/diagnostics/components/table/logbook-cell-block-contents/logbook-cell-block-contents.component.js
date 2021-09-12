import { isNil } from 'ramda';
import React from 'react';

import {
  LogbookCellBlockContentsBase,
  LogbookCellBlockContentsBG,
  LogbookCellBlockContentsHyper,
  LogbookCellBlockContentsHypo,
} from './logbook-cell-block-contents.style';

import { LOGBOOK_UNITS } from '../../../constants/logbook.constants';

export const LogbookCellBlockContents = ({
  unit,
  value,
  belowTargetRange,
  aboveTargetRange,
  hypoSymptoms,
  children,
}) => {
  if (unit !== LOGBOOK_UNITS.GLUCOSE || isNil(value)) {
    return (
      <LogbookCellBlockContentsBase>{children}</LogbookCellBlockContentsBase>
    );
  }

  if (aboveTargetRange) {
    return (
      <LogbookCellBlockContentsHyper>{children}</LogbookCellBlockContentsHyper>
    );
  } else if (belowTargetRange || hypoSymptoms) {
    return (
      <LogbookCellBlockContentsHypo hypoSymptoms={hypoSymptoms}>
        {children}
      </LogbookCellBlockContentsHypo>
    );
  }

  return <LogbookCellBlockContentsBG>{children}</LogbookCellBlockContentsBG>;
};
