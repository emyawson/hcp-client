import styled from 'styled-components';

import { borderRadius, colors, spacing } from 'src/domains/diagnostics/styles';
import { Block } from 'src/domains/diagnostics/components/block';

export const LogbookCellBlockContentsBase = styled(Block)`
  border: 0.0625rem solid transparent;
  border-radius: ${borderRadius.three};
  background-color: transparent;
  width: 1.95rem;
  padding: ${spacing.one};
  color: ${colors.black};
  margin: 0 auto;
`;

LogbookCellBlockContentsBase.displayName = 'LogbookCellBlockContentsBase';

export const LogbookCellBlockContentsBG = LogbookCellBlockContentsBase.extend`
  color: ${colors.green};
  font-weight: 600;
`;

LogbookCellBlockContentsBG.displayName = 'LogbookCellBlockContentsBG';

export const LogbookCellBlockContentsHyper = LogbookCellBlockContentsBase.extend`
  background-color: ${colors.quartzBlue};
`;

LogbookCellBlockContentsHyper.displayName = 'LogbookCellBlockContentsHyper';

export const LogbookCellBlockContentsHypo = LogbookCellBlockContentsBase.extend`
  background-color: ${colors.trafficRed2};
  ${props =>
    props.hypoSymptoms
      ? `
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 0.0625rem;
      left: 0.0625rem;
      right: 0.0625rem;
      height: 1.5rem;
      border: 0.0625rem solid ${colors.white};
      border-radius: ${borderRadius.three};
    }
  `
      : null};
`;

LogbookCellBlockContentsHypo.displayName = 'LogbookCellBlockContentsHypo';
