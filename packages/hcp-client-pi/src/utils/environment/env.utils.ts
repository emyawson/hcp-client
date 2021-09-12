export const getProcessEnv = (): any => process.env;
export const getWindowEnv = (window: any) =>
  window.REACT_APP ? window.REACT_APP : process.env;
