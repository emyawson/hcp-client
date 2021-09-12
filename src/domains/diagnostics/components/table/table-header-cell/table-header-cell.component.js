import React from 'react';

import {
  LocalizedText,
  ParenthesesWrapper,
} from 'src/domains/diagnostics/components';
import { translate } from 'src/i18n'; // TODO: move to diagnostics
import { RenderIf } from 'src/domains/diagnostics/utils';

import { TableHeaderCellTitleWithTooltip } from './table-header-cell-title.component';

import {
  LogbookCellBlock,
  LogbookCellBlocksContainer,
  LogbookTableCell,
} from '..';

export const TableHeaderCell = ({
  keyText,
  headerKey,
  colspan,
  width,
  noFill,
  noTopBorder,
  noRightBorder,
  borderBottom,
  color,
  textTransform,
  fontWeight,
  height,
  verticalAlign,
  overflow,
  padding,
  textAlign,
  whiteSpace,
}) => (
  <LogbookTableCell
    key={`${headerKey}-${keyText}`}
    alternateFill={!noFill}
    borderRight={!noRightBorder ? { thick: true } : null}
    borderTop={!noTopBorder ? { thick: true } : null}
    borderBottom={borderBottom}
    p={1}
    colspan={colspan}
    width={width}
    color={color}
    textTransform={textTransform}
    fontWeight={fontWeight}
    height={height}
    verticalAlign={verticalAlign}
    textAlign={textAlign}
  >
    <LogbookCellBlocksContainer>
      <LogbookCellBlock alternateFill={!noFill} height={height}>
        <TableHeaderCellTitleWithTooltip
          height={height}
          overflow={overflow}
          whiteSpace={whiteSpace}
          textAlign={textAlign}
          padding={padding}
        >
          <RenderIf validate={headerKey && headerKey === 'insulin'}>
            <span>
              <LocalizedText textKey={`${headerKey}`} />
              &nbsp;
              <ParenthesesWrapper
                text={translate('graphs.logbookDiary.unitSymbol')}
              />
            </span>
          </RenderIf>
          <RenderIf validate={headerKey && headerKey !== 'insulin'}>
            <LocalizedText textKey={`${headerKey}`} />
          </RenderIf>
        </TableHeaderCellTitleWithTooltip>
      </LogbookCellBlock>
    </LogbookCellBlocksContainer>
  </LogbookTableCell>
);
