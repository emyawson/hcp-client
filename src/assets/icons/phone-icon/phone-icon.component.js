import * as React from 'react';

import { colors } from '../../../core/styles/colors';
import { SvgIcon } from '../icon';

export const PhoneIcon = ({ height = 21, fillColor = colors.grayMedium }) => {
  const originalWidth = 21;
  const originalHeight = 21;

  const aspectRatio = originalWidth / originalHeight;

  return (
    <SvgIcon
      width={height * aspectRatio}
      height={height}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
    >
      <path
        d="M16.53 12.723c-.42-.436-.925-.67-1.46-.67-.532 0-1.042.23-1.478.666l-1.365 1.36c-.112-.06-.225-.116-.333-.172-.155-.078-.302-.151-.427-.229-1.28-.812-2.441-1.87-3.556-3.24-.54-.683-.903-1.257-1.166-1.84.354-.324.682-.661 1.002-.985l.363-.367c.907-.908.907-2.083 0-2.99l-1.18-1.18c-.133-.133-.272-.271-.401-.41-.26-.267-.531-.544-.812-.803-.42-.415-.92-.635-1.447-.635-.528 0-1.037.22-1.47.635l-.008.008-1.469 1.482a3.16 3.16 0 0 0-.937 2.009C.282 6.623.654 7.799.939 8.567c.7 1.888 1.745 3.638 3.305 5.513 1.892 2.26 4.168 4.043 6.769 5.3.994.471 2.32 1.029 3.802 1.124.09.004.185.008.272.008.998 0 1.836-.358 2.492-1.071.005-.009.013-.013.018-.022.224-.272.484-.518.756-.782.185-.177.376-.362.561-.557.428-.445.653-.963.653-1.495 0-.535-.23-1.05-.666-1.481l-2.371-2.38zm1.546 4.55c-.004 0-.004.004 0 0-.168.18-.341.345-.527.526-.28.268-.566.549-.834.864-.436.467-.95.687-1.624.687-.065 0-.134 0-.199-.004-1.283-.082-2.475-.583-3.37-1.011a19.19 19.19 0 0 1-6.376-4.994c-1.473-1.775-2.458-3.417-3.11-5.18-.402-1.075-.549-1.913-.484-2.704.043-.505.238-.924.596-1.283l1.474-1.473c.211-.199.436-.307.656-.307.272 0 .493.164.63.303l.014.013c.263.246.514.5.777.773.134.138.273.276.41.419l1.18 1.18c.458.457.458.88 0 1.338-.125.126-.246.251-.371.372-.363.371-.709.717-1.085 1.054-.008.009-.017.013-.021.022-.372.371-.303.734-.225.98l.013.04c.307.742.739 1.442 1.395 2.276l.005.004c1.192 1.469 2.45 2.614 3.836 3.49.177.113.358.204.531.29.156.078.303.151.428.23.017.008.035.02.052.03a.936.936 0 0 0 .427.107c.359 0 .584-.224.657-.298l1.478-1.477c.146-.147.38-.324.652-.324.268 0 .488.168.622.315l.009.009 2.38 2.38c.445.44.445.894.004 1.352zm-6.661-12.36c1.132.19 2.16.726 2.98 1.546a5.507 5.507 0 0 1 1.547 2.981.58.58 0 0 0 .575.484.584.584 0 0 0 .579-.683 6.663 6.663 0 0 0-1.871-3.607 6.663 6.663 0 0 0-3.607-1.87.586.586 0 0 0-.674.475.577.577 0 0 0 .47.674zm9.383 4.16a10.962 10.962 0 0 0-3.08-5.94 10.962 10.962 0 0 0-5.94-3.08.581.581 0 0 0-.67.475c-.052.32.16.618.48.674a9.815 9.815 0 0 1 5.309 2.752 9.787 9.787 0 0 1 2.752 5.309.58.58 0 0 0 .574.484.572.572 0 0 0 .575-.674z"
        fill={fillColor}
      />
    </SvgIcon>
  );
};