import { mount } from 'enzyme';
import * as React from 'react';
import { Observable } from 'rxjs/Observable';

import { Bundle } from './bundle.component';

describe('bundle.component tests', () => {
  const TestComponent: React.StatelessComponent<any> = () => <h1>Test</h1>;

  it('should resolve an async function to load a bundle', () => {
    let promise;
    const mounted = mount(
      <Bundle
        bundleWillLoad={() => {
          promise = Promise.resolve({
            component: TestComponent,
            reducerEntry: {
              key: 'counter',
              reducer: () => null,
            },
            rootEpic: () => Observable.of(null),
          });
          return promise;
        }}
        bundleDidLoad={(Component: React.StatelessComponent<any>) => (
          <Component />
        )}
      />,
    );
    return promise.then(() => mounted.update()).then(() => {
      expect(mounted.contains(<h1>Test</h1>)).toBeTruthy();
    });
  });
});
