import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const BedIcon = ({ height, width }) => {
  const originalWidth = 22;
  const originalHeight = 15;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.bed')}
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
          id="NEW-ICONS"
          transform="translate(-1107.000000, -529.000000)"
          fill-rule="nonzero"
        >
          <g id="Group-16" transform="translate(1107.000000, 529.000000)">
            <rect
              id="Rectangle-path"
              fill="#B4B4B4"
              x="2.04927536"
              y="0.428571429"
              width="16.9014493"
              height="5.53392857"
            />
            <path
              d="M18.9507246,3.60535714 C18.9507246,2.54464286 18.9507246,1.48392857 18.9507246,0.428571429 C13.3333333,-0.1125 7.66666667,-0.1125 2.04927536,0.428571429 C2.04927536,1.48928571 2.04927536,2.54464286 2.04927536,3.60535714 C7.68514493,3.60535714 13.3148551,3.60535714 18.9507246,3.60535714 Z"
              id="Shape"
              fill="#324A5E"
            />
            <polygon
              id="Shape"
              fill="#EFEFEF"
              points="19.5652667 6 22 10 0 10 2.43473326 6"
            />
            <rect
              id="Rectangle-path"
              fill="#324A5E"
              x="0.0497175141"
              y="8.56451613"
              width="21.8943503"
              height="5.3516129"
            />
            <path
              d="M0.0497175141,12.6629032 C0.0497175141,11.3024194 0.0497175141,9.94193548 0.0497175141,8.58145161 C7.32711864,7.85322581 14.6666667,7.85322581 21.9440678,8.58145161 C21.9440678,9.94193548 21.9440678,11.3024194 21.9440678,12.6629032 C14.6480226,12.6629032 7.3519774,12.6629032 0.0497175141,12.6629032 Z"
              id="Shape"
              fill="#B7B7B7"
            />
            <polygon
              id="Shape"
              fill="#324A5E"
              points="1.39830508 14.9943548 0.0497175141 14.9943548 0.0497175141 13.916129 2.23107345 13.916129"
            />
            <polygon
              id="Shape"
              fill="#324A5E"
              points="20.6016949 14.9943548 21.9502825 14.9943548 21.9502825 13.916129 19.7689266 13.916129"
            />
            <path
              d="M16.9195238,6 L12.0290476,6 C11.9919048,6 11.9671429,5.96969697 11.9671429,5.93939394 L11.9671429,4.09090909 C11.9671429,4.05454545 11.9980952,4.03030303 12.0290476,4.03030303 L16.9195238,4.03030303 C16.9566667,4.03030303 16.9814286,4.06060606 16.9814286,4.09090909 L16.9814286,5.93939394 C16.9814286,5.96969697 16.9566667,6 16.9195238,6 Z"
              id="Shape"
              fill="#FFD05B"
            />
            <path
              d="M8.97095238,6 L4.08047619,6 C4.04333333,6 4.01857143,5.96969697 4.01857143,5.93939394 L4.01857143,4.09090909 C4.01857143,4.05454545 4.04952381,4.03030303 4.08047619,4.03030303 L8.97095238,4.03030303 C9.00809524,4.03030303 9.03285714,4.06060606 9.03285714,4.09090909 L9.03285714,5.93939394 C9.03285714,5.96969697 9.00809524,6 8.97095238,6 Z"
              id="Shape"
              fill="#FFD05B"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};
