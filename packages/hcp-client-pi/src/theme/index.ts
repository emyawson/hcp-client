import { ComponentClass } from 'react';
import * as styledComponents from 'styled-components';
import { ThemeProviderProps } from 'styled-components';

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  // ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

const {
  ThemeProvider,
}: {
  ThemeProvider: ComponentClass<ThemeProviderProps<IThemeInterface>>
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
    IThemeInterface
  >;

export const createStyledComponent = <
  Tag extends keyof JSX.IntrinsicElements,
  Props
>(
  tag: Tag,
) => styled<Props, Tag>(tag);

export interface IThemeInterface {
  animations: { [key: string]: string };
  BASE_FONT_SIZE: number;
  borderRadius: string[];
  boxShadow: ({ color, depth }?: { color?: string; depth?: string }) => string;
  boxShadows: { [key: string]: string };
  breakpoints: number[];
  colors: { [key: string]: string };
  fontSize: { [key: string]: string };
  fontSizes: number[];
  fontWeights: { [key: string]: number };
  letterSpacing: { [key: string]: string };
  spacing: { [key: string]: string };
  space: string[];
  textStyles: any;
  transitions: { [key: string]: string };
  zIndexes: {
    hidden: number;
    base: number;
    foreground: number;
    overlay: number;
    popover: number;
    routeNav: number;
    modal: number;
    alert: number;
  };
}

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };

export * from './transitions';
