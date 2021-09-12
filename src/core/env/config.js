/**
 *  {
 *   REACT_APP_API_VERSION: string,
 *   REACT_APP_API_ROOT: string,
 *   REACT_APP_GIGYA_TOKEN: string,
 *   REACT_APP_HCP_ENV: string,
 *   NODE_ENV: string,
 * };
 */
export const devMode =
  process.env.NODE_ENV === 'development' ||
  process.env.REACT_APP_HCP_ENV === 'development';
export const localMode =
  process.env.NODE_ENV === 'development' ||
  process.env.REACT_APP_HCP_ENV === 'local';
export const testMode = process.env.NODE_ENV === 'test';
export const Config = localMode || testMode ? process.env : window.REACT_APP;
