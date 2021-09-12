export type GraphAxisLabel = {
  x: number,
  y: number,
  xOffset?: number,
  yOffset?: number,
  label: string,
  rotation?: number,
  style?: {
    fontSize?: number,
    fontWeight?: string,
  },
};

export type GraphAxis = {
  name: string,
  orientation?: 'bottom' | 'left' | 'right' | 'top',
  title?: string,
  tickFormat: Function,
  tickTotal: number,
  tickValues: Array<*>,
  top?: number,
  type: 'x' | 'y',
};
