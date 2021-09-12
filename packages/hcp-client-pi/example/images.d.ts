declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.md' {
  const value: any;
  export default value;
}

declare type bool = boolean;
declare type ChangeEvent<T> = any;
