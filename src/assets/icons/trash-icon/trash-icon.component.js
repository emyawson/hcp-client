import React from 'react';

import { SvgIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';

const originalWidth = 16;
const originalHeight = 18;
const aspectRatio = originalWidth / originalWidth;

export const TrashIcon = ({
  fillColor = colors.brandBlue,
  height = originalHeight,
}) => (
  <SvgIcon
    title="Remove"
    width={height * aspectRatio}
    height={height}
    originalWidth={originalWidth}
    originalHeight={originalHeight}
  >
    <path
      d="M7.111 1V.4c0-.22.18-.4.4-.4h1.867c.22 0 .4.18.4.4V1H15.6c.22 0 .4.18.4.4v1.2a.4.4 0 0 1-.4.4H.4a.4.4 0 0 1-.4-.4V1.4c0-.22.18-.4.4-.4h6.711zM2.75 16.25h10.5V4.641c0-.223.023-.304.067-.385a.454.454 0 0 1 .189-.19c.081-.043.162-.066.385-.066h.468c.223 0 .304.023.385.067a.454.454 0 0 1 .19.189c.043.081.066.162.066.385v11.843c0 .086-.003.151-.01.203.007.053.01.118.01.204v.468c0 .223-.023.304-.067.385a.454.454 0 0 1-.189.19c-.081.043-.162.066-.385.066H1.641c-.223 0-.304-.023-.385-.067a.454.454 0 0 1-.19-.189C1.024 17.663 1 17.582 1 17.36v-.468c0-.086.003-.151.01-.203a1.597 1.597 0 0 1-.01-.204V4.641c0-.223.023-.304.067-.385a.454.454 0 0 1 .189-.19C1.337 4.024 1.418 4 1.64 4h.468c.223 0 .304.023.385.067a.454.454 0 0 1 .19.189c.043.081.066.162.066.385V16.25z"
      fill={fillColor}
      fillRule="evenodd"
    />
  </SvgIcon>
);
