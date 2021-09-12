import React from 'react';

import { convertPxToRem } from 'src/utils';

export class IFrame extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      title,
      width,
      height,
      src,
      frameBorder,
      resizeOnLoad,
      onLoad,
      styleProps,
      ...props
    } = this.props;

    return (
      <iframe
        ref={this.setIframeRef}
        style={{ width, height, ...styleProps }}
        onLoad={a => {
          if (resizeOnLoad) {
            this.resizeFrame(this.iframe);
          }
          onLoad(this.iframe);
        }}
        title={title}
        src={src}
        frameBorder={frameBorder}
        {...props}
      />
    );
  }

  resizeFrame = iframe => {
    iframe.height = convertPxToRem(
      iframe.contentWindow.document.body.scrollHeight,
    );
  };

  setIframeRef = element => {
    this.iframe = element;
  };
}

IFrame.defaultProps = {
  frameBorder: 0,
  onLoad: () => undefined,
  resizeOnLoad: true,
  styleProps: {},
  width: '100%',
};
