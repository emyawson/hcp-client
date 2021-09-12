import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

import { SvgIcon } from '../icon';

export const LogbookIcon = ({ fillColor = colors.grayDark, height = 13 }) => {
  const originalWidth = 16;
  const originalHeight = 13;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M1.271 1.847h12.828v1.5H1.271l-.001-1.5h.001zm12.828-1H1.271a1 1 0 0 0-1 1v1.5c0 .474.335.85.776.955.075.018.145.045.224.045h12.828c.079 0 .15-.027.224-.045a.984.984 0 0 0 .776-.955v-1.5a1 1 0 0 0-1-1zM14.099 11.28H1.27l-.001-5H14.1v5zm.223-5.956c-.074-.018-.144-.045-.223-.045H1.27c-.078 0-.148.027-.222.045a.985.985 0 0 0-.778.955v5a1 1 0 0 0 1 1h12.828a1 1 0 0 0 1-1v-5a.984.984 0 0 0-.777-.955z"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};

export const LogbookStatsIcon = ({
  fillColor = colors.grayDark,
  height = 13,
}) => {
  const originalWidth = 13;
  const originalHeight = 13;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M11.152 9.33c.18-.315.27-.833.27-1.553 0-.7-.09-1.21-.27-1.53a.886.886 0 0 0-.825-.48c-.37 0-.645.16-.825.48-.18.32-.27.83-.27 1.53 0 .72.09 1.238.27 1.553.18.314.455.472.825.472.37 0 .645-.158.825-.472m-2.79.862c-.47-.55-.705-1.36-.705-2.43 0-1.05.237-1.847.712-2.393.475-.545 1.128-.817 1.958-.817.84 0 1.495.275 1.965.825.47.55.705 1.35.705 2.4 0 1.06-.235 1.865-.705 2.415s-1.125.825-1.965.825c-.84 0-1.495-.275-1.965-.825m-4.245.87c-.13.08-.26.12-.39.12a.657.657 0 0 1-.472-.195.654.654 0 0 1-.203-.495c0-.17.05-.34.15-.51L8.662.547c.09-.16.2-.28.33-.36.13-.08.26-.12.39-.12.18 0 .337.065.473.195.134.13.202.296.202.495 0 .17-.05.34-.15.51l-5.46 9.435c-.09.16-.2.28-.33.36m-.503-6.097c.175-.316.263-.833.263-1.553 0-.7-.09-1.21-.27-1.53a.886.886 0 0 0-.825-.48c-.37 0-.643.157-.818.473-.175.314-.262.827-.262 1.537 0 .72.087 1.237.262 1.553.175.314.448.472.818.472.38 0 .658-.158.832-.472m-2.797.862c-.47-.55-.705-1.354-.705-2.415 0-1.05.235-1.85.705-2.4.47-.55 1.125-.825 1.965-.825.84 0 1.497.275 1.973.825.474.55.712 1.35.712 2.4 0 1.06-.238 1.865-.712 2.415-.476.55-1.133.825-1.973.825-.84 0-1.495-.275-1.965-.825"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};

export const LogbookDiaryIcon = ({
  fillColor = colors.grayDark,
  height = 13,
}) => {
  const originalWidth = 20;
  const originalHeight = 13;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M18.757 1.532h-12a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5M6.757 6.742h4.47a.75.75 0 0 0 0-1.5h-4.47a.75.75 0 0 0 0 1.5M14.232 8.951H6.757a.75.75 0 0 0 0 1.5h7.475a.75.75 0 0 0 0-1.5M1.407 1.85h2v1h-2v-1zm2-1h-2a1 1 0 0 0-1 1v1c0 .303.142.564.354.748a.988.988 0 0 0 .646.252h2c.25 0 .47-.1.646-.252a.986.986 0 0 0 .354-.748v-1a1 1 0 0 0-1-1zM3.407 5.482v1h-2v-1h2zm0-1h-2a.986.986 0 0 0-.646.252.986.986 0 0 0-.354.748v1c0 .303.141.564.353.748a.988.988 0 0 0 .647.252h2c.25 0 .472-.1.647-.252a.986.986 0 0 0 .353-.748v-1a.986.986 0 0 0-.354-.748.986.986 0 0 0-.646-.252zM3.407 10.113h-2v-1h2v1zm0-2h-2a.988.988 0 0 0-.647.252.986.986 0 0 0-.353.748v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1a.986.986 0 0 0-.353-.748.988.988 0 0 0-.647-.252z"
        fill={fillColor}
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};
