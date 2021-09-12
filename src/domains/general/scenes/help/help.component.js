import React, { Component } from 'react';
import { Document } from 'react-pdf/dist/entry.webpack';
import { Page } from 'react-pdf';

import { generalLinks } from 'src/domains/general/routes';
import { Button } from 'src/components/button';
import { XIcon, ArrowRightIcon } from 'src/assets/icons';
import { Title } from 'src/components/fonts';
import { Link } from 'src/components/link';
import { colors } from 'src/core/styles';
import { RenderIf } from 'src/utils';
import { translate } from 'src/i18n';
import { Column, LoadingRing } from 'src/components';

import {
  DocumentHeader,
  DocumentPages,
  DocumentClose,
  DocumentWrapper,
  DocumentNavigationButtonContainerLeft,
  DocumentNavigationButtonContainerRight,
  ArrowFlipSpan,
} from './help.style';

export class HelpComponent extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  };

  render() {
    const { url } = this.props;
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <DocumentWrapper alignItems="center" bg="black">
          <DocumentHeader>
            <Title color={colors.white}>
              {translate('help.title')}
              <RenderIf validate={numPages}>
                <DocumentPages>
                  {pageNumber} / {numPages}
                </DocumentPages>
              </RenderIf>
            </Title>
            <DocumentClose>
              <Link to={generalLinks.home}>
                <XIcon height={14} fillColor={colors.white} />
              </Link>
            </DocumentClose>
          </DocumentHeader>

          {url && (
            <Document
              file={url}
              onLoadSuccess={this._onDocumentLoad}
              loading={this._renderLoader()}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          )}
          {!url && (
            <Column align="center" height="100vh" justifyContent="center">
              <LoadingRing infinite />
            </Column>
          )}
          <RenderIf validate={numPages}>
            <DocumentNavigationButtonContainerLeft>
              <Button
                onClick={() => {
                  this._onPreviousPage({ pageNumber, numPages });
                }}
                accessibilityLabel={translate('help.prevPage')}
                icon={
                  <ArrowFlipSpan>
                    <ArrowRightIcon fillColor={colors.white} />
                  </ArrowFlipSpan>
                }
                minWidth="auto"
                buttonStyle="info"
              />
            </DocumentNavigationButtonContainerLeft>
            <DocumentNavigationButtonContainerRight>
              <Button
                onClick={() => {
                  this._onNextPage({ pageNumber, numPages });
                }}
                accessibilityLabel={translate('help.nextPage')}
                minWidth="auto"
                icon={<ArrowRightIcon fillColor={colors.white} />}
                buttonStyle="info"
              />
            </DocumentNavigationButtonContainerRight>
          </RenderIf>
        </DocumentWrapper>
      </div>
    );
  }

  _renderLoader = () => (
    <Column align="center" height="100vh" justifyContent="center">
      <LoadingRing infinite />
    </Column>
  );

  _onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages, isLoading: false });
  };

  _onNextPage = ({ pageNumber, numPages }) => {
    this.setState({ pageNumber: pageNumber < numPages ? pageNumber + 1 : 1 });
  };

  _onPreviousPage = ({ pageNumber, numPages }) => {
    this.setState({ pageNumber: pageNumber > 1 ? pageNumber - 1 : numPages });
  };
}
