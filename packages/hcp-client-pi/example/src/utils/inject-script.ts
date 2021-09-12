import { stringify } from 'qs';

type InjectScriptOptions = {
  path: string;
  queryParams: { [key: string]: string };
  onError: (err: any) => any;
  onLoad: (res: any) => any;
};

export const injectScript = ({
  path,
  queryParams,
  onError,
  onLoad,
}: InjectScriptOptions) => {
  const script = document.createElement('script');
  script.src = `${path}?${stringify(queryParams)}`;
  script.onload = onLoad;
  script.onerror = onError;
  document.body.appendChild(script);
};
