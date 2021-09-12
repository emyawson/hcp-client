import styled from 'styled-components';

export const createStyledComponent = <
  Tag extends keyof JSX.IntrinsicElements,
  Props
>(
  tag: Tag,
) => styled<Props, Tag>(tag);
