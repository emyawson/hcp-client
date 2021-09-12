import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

type Props = {
  height?: number,
};

export const AppLogo = ({ height = 47 }: Props) => {
  const originalWidth = 47;
  const originalHeight = 47;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      title={translate('general.appName')}
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <defs>
        <linearGradient
          id="a"
          x1="-.008%"
          x2="100.208%"
          y1="49.965%"
          y2="49.965%"
        >
          <stop offset="0%" stopColor="#00ADEE" />
          <stop offset="100%" stopColor="#2B388F" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="-1.133%"
          x2="99.54%"
          y1="50.625%"
          y2="50.625%"
        >
          <stop offset="0%" stopColor="#F3CA35" />
          <stop offset="24.79%" stopColor="#F3C232" />
          <stop offset="62.39%" stopColor="#F5AD29" />
          <stop offset="99.81%" stopColor="#F6921E" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <circle
          cx={23.4}
          cy={23.2}
          r={23.2}
          fill="url(#a)"
          fillRule="nonzero"
        />
        <g transform="translate(14 11)">
          <path
            fill="#FFF"
            d="M.9 15.1c.7-.4 1.5 0 1.7.7.9 2.8 3.6 4.7 6.6 4.7 3.3 0 6.2-2.3 6.8-5.6.4-2-.6-4.3-2.8-6.8l-3.1-3.5c-.5-.6-1.4-.6-1.9 0L6 7.2c-.4.5-1.2.6-1.7.2 0 0-1.3-.8-.2-2L8.3.6c.5-.6 1.4-.6 1.9 0l5.1 5.8c2.8 3.3 3.9 6.4 3.4 9.1-.9 4.4-4.7 7.8-9.4 7.8-4.2 0-7.8-2.8-9.1-6.5-.3-.7.1-1.3.7-1.7z"
          />
          <circle cx={2.8} cy={11.1} r={2.4} fill="url(#b)" />
        </g>
      </g>
    </SvgIcon>
  );
};

AppLogo.displayName = 'AppLogo';
