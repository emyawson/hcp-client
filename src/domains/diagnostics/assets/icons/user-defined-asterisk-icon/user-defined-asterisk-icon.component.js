import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const UserDefinedAsteriskIcon = ({ height, width }) => {
  const originalWidth = 16;
  const originalHeight = 16;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.userDefinedAsterisk')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g
        id="_icons"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="Artboard-1"
          transform="translate(-1507.000000, -1443.000000)"
          fill="#FFD400"
        >
          <g
            id="noun_1755508_cc"
            transform="translate(1507.000000, 1443.000000)"
          >
            <polygon
              id="Shape"
              points="16 9.95121951 11.1219512 9.75609756 13.6585366 14.0487805 10.3414634 16 8 11.7073171 5.65853659 16 2.14634146 14.0487805 4.68292683 9.75609756 0 10.1463415 0 6.04878049 4.68292683 6.24390244 2.14634146 1.95121951 5.65853659 0 8 4.29268293 10.3414634 0 13.6585366 1.95121951 11.3170732 6.04878049 16 5.85365854"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};
