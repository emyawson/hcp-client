import { injectScript } from './inject-script';

describe('Script injection util', () => {
  it('should inject a script onto the body of the dom', () => {
    injectScript({
      path: 'src',
      queryParams: {
        qs1: '1',
      },
      onError: () => 'error',
      onLoad: () => 'load',
    });
    const script = document.getElementsByTagName('script')[0];
    expect(script.src).toBe('http://localhost/src?qs1=1');
    // @ts-ignore
    expect(script.onload()).toBe('load');
    // @ts-ignore
    expect(script.onerror()).toBe('error');
  });
});
