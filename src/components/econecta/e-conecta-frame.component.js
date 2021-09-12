import React from 'react';

import { IFrame } from 'src/components/iframe';

const BASE_URL = '/post-redirect.html';

const submitOnLoad = (iframe, token, action, patientId) => {
  if (iframe && iframe.contentWindow && iframe.contentWindow.__PR__) {
    iframe.contentWindow.__PR__(token, action, patientId);
  }
};

export const EConectaFrame = ({
  action,
  height,
  onLoad,
  patientId,
  token,
  width,
  ...props
}) => (
  <IFrame
    scrolling="no"
    frameBorder="0"
    width={width}
    height={height}
    onLoad={iframe => submitOnLoad(iframe, token, action, patientId)}
    {...props}
    src={`${BASE_URL}`}
  />
);

EConectaFrame.defaultProps = {
  height: 'calc(100vh - 110px)',
  onLoad: () => null,
  width: '100%',
};
