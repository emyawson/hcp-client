import React from 'react';

import { translate } from 'src/i18n';

import { SvgIcon } from '../icon';

export const SnackIcon = ({ height, width }) => {
  const originalWidth = 16;
  const originalHeight = 15;

  const aspectRatio = originalWidth / originalHeight;
  const calculatedWidth = width ? width : height * aspectRatio;
  const calculatedHeight = height ? height : width / aspectRatio;

  return (
    <SvgIcon
      title={translate('graphs.iconTitles.snack')}
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
          transform="translate(-427.000000, -526.000000)"
          fill-rule="nonzero"
        >
          <g id="Group-2" transform="translate(427.000000, 526.000000)">
            <path
              d="M2.94736842,12.6315789 C1.31956674,12.6315789 0,11.3394772 0,9.74555594 L0,2.886023 C0,1.29210178 1.31956674,0 2.94736842,0 C4.5751701,0 5.89473684,1.29210178 5.89473684,2.886023 L5.89473684,9.74555594 C5.89473684,11.3394772 4.57512738,12.6315789 2.94736842,12.6315789 Z"
              id="Shape"
              fill="#8CD5FF"
            />
            <g id="Group">
              <path
                d="M2.87280576,0.000208136235 L2.87280576,12.5711788 C4.43535457,12.56635 5.70059609,11.2824409 5.70059609,9.69910691 L5.70059609,2.87228004 C5.70059609,1.28894607 4.43535457,0.00507852412 2.87280576,0.000208136235 Z"
                id="Shape"
                fill="#73B6DC"
              />
              <path
                d="M0.0274203494,6.21632167 L0.0274203494,9.69914853 C0.0274203494,11.2854797 1.29738952,12.5714286 2.86400822,12.5714286 C4.43058582,12.5714286 5.70059609,11.2854797 5.70059609,9.69914853 L5.70059609,6.21632167 L0.0274203494,6.21632167 Z"
                id="Shape"
                fill="#4CA0D0"
              />
            </g>
            <path
              d="M5.14868091,13.3776349 C3.89780812,12.1267621 3.89780812,10.0986547 5.14868091,8.84778195 L10.5319925,3.46447038 C11.7828653,2.21359759 13.8109262,2.21359759 15.0618454,3.46447038 C16.3127182,4.71534316 16.3127182,6.74340411 15.0618454,7.99432332 L9.67858027,13.3776349 C8.42761464,14.6285077 6.39955369,14.6285077 5.14868091,13.3776349 Z"
              id="Shape"
              fill="#B9FFE7"
            />
            <g id="Group" transform="translate(4.210526, 3.368421)">
              <path
                d="M10.5184702,0.0610605327 C10.5058268,0.0488135593 10.4926434,0.0374818402 10.479865,0.025496368 L0.873385827,9.33075545 C0.88575928,9.34313317 0.897457818,9.35590315 0.910101237,9.36815012 C2.12251969,10.5425521 4.08823397,10.5425521 5.30069741,9.36815012 L10.5185152,4.31394189 C11.7308886,3.13953995 11.7308886,1.23546247 10.5184702,0.0610605327 Z"
                id="Shape"
                fill="#9CEFD2"
              />
              <path
                d="M3.5720135,3.37888492 L0.910101237,5.95733044 C-0.30231721,7.13173238 -0.30231721,9.03585345 0.910101237,10.2102554 C2.12251969,11.3846573 4.08823397,11.3846573 5.30069741,10.2102554 L7.96260967,7.63180986 L3.5720135,3.37888492 Z"
                id="Shape"
                fill="#8BF5C3"
              />
            </g>
            <path
              d="M5.05263158,13.353078 C5.06438999,13.3660558 5.07550703,13.3794449 5.08752199,13.3922857 C6.23967515,14.6236241 8.10768031,14.6236241 9.25987623,13.3922857 L11.7894737,10.6888338 L9.66752962,8.42105263 L5.05263158,13.353078 Z"
              id="Shape"
              fill="#59E89E"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};
