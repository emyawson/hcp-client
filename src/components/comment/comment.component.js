import React from 'react';

import { SpeechBubbleIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles';
import { RenderIf } from 'src/utils';

import {
  CommentCardDiv,
  CommentWrapperDiv,
  CommentContentDiv,
  CommentIconDiv,
  CommentIconBadge,
  CommentHeaderDiv,
  CommentBodyP,
  CommentHeadline,
  CommentDateSpan,
} from './comment.style';

export const Comment = ({
  date,
  isExpanded = false,
  message,
  showIcon = true,
  title,
}) => (
  <CommentCardDiv>
    <CommentWrapperDiv isExpanded={isExpanded}>
      <RenderIf validate={showIcon}>
        <CommentIconDiv isExpanded={isExpanded}>
          <CommentIconBadge
            bgColor={colors.trafficRed}
            icon={<SpeechBubbleIcon height={20} fillColor={colors.white} />}
            size={38}
          />
        </CommentIconDiv>
      </RenderIf>
      <CommentContentDiv>
        <CommentHeaderDiv>
          <CommentHeadline isExpanded={isExpanded}>{title}</CommentHeadline>
          <CommentDateSpan>- {date}</CommentDateSpan>
        </CommentHeaderDiv>
        <CommentBodyP>{message}</CommentBodyP>
      </CommentContentDiv>
    </CommentWrapperDiv>
  </CommentCardDiv>
);
