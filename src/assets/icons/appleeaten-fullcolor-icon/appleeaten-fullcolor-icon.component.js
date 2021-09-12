import React from 'react';

import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { SvgIcon } from '../icon';

export const AppleEatenFullColorIcon = ({ height, width }) => {
  const originalWidth = 10;
  const originalHeight = 18;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.afterMeal')}
      width={calculatedWidth}
      height={calculatedHeight}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <g fillRule="evenodd">
        <path
          d="M3.652 13.982c-.197.644-.459 1.32-.818 2.042 1.038 1.035 2.337 1.528 3.791.88 1.32.575 2.47.3 3.418-.437a15.488 15.488 0 0 1-1.029-2.38c-1.487.615-3.083.86-5.362-.105M8.963 7.834a7.443 7.443 0 0 1 1.024-1.807C9.035 5.6 8.5 5.2 7.167 5.74c-.039.014-.13.03-.245.04.004.204.02.408.014.61a.497.497 0 0 1-.496.483h-.013a.497.497 0 0 1-.483-.51c.002-.094-.007-.19-.007-.286a5.163 5.163 0 0 1-.607.039c-.662 0-1.414-.135-2.188-.425a4.786 4.786 0 0 0-.7.42c.336.547.7 1.179 1.001 1.907 1.755-.581 3.595-.643 5.52-.184"
          fill="#EE5151"
        />
        <path
          d="M8.46 9.948a7.65 7.65 0 0 1 .503-2.114c-1.925-.459-3.765-.398-5.52.183.366.88.638 1.904.651 3.1.01.861-.12 1.814-.442 2.865 2.18.98 3.92.725 5.362.104-.528-1.577-.666-2.956-.555-4.138"
          fill="#F3D58E"
        />
        <path
          d="M5.929 5.677c-.002-.077-.002-.153-.005-.23-.014-.292-.04-.584-.074-.877-.014-.123-.027-.246-.045-.37a13.429 13.429 0 0 0-.357-1.725c-.08-.082-.144-.176-.232-.252C3.526.757.92 1.053.81 1.069l-.646.078.097.643c.21 1.423.8 2.403 1.545 3.069.41.367.867.639 1.337.833a5.845 5.845 0 0 0 2.188.424c.219 0 .418-.017.607-.04 0-.132-.006-.266-.01-.4"
          fill="#78BD2D"
        />
        <path
          d="M6.922 5.781a14.74 14.74 0 0 0-.907-4.778.495.495 0 1 0-.929.345c.138.374.255.75.361 1.126a13.483 13.483 0 0 1 .476 2.972c.003.077.003.153.005.231.004.132.01.266.01.4 0 .096.008.191.006.287a.497.497 0 0 0 .483.51h.013a.497.497 0 0 0 .496-.485c.006-.202-.01-.405-.014-.608"
          fill="#8F5E2E"
        />
      </g>
    </SvgIcon>
  );
};
