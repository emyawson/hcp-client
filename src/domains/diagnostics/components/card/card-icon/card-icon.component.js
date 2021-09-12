import React from 'react';
import { isEmpty } from 'ramda';

import { IconContainerDiv, IconContainerLink } from './card-icon.style';

type Props = {
  icon: React.Node,
  onClick?: () => void,
  link?: string,
};

export const CardIcon = ({ icon, link, onClick }: Props) =>
  isEmpty(link) ? (
    <IconContainerDiv onClick={onClick}>{icon}</IconContainerDiv>
  ) : (
    <IconContainerLink to={link}>{icon}</IconContainerLink>
  );

CardIcon.defaultProps = {
  link: '',
  onClick: () => null,
};
