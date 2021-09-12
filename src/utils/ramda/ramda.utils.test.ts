import { getIn, pathOr, propOr, set, setIn } from './ramda.utils';

describe('ramda.utils tests', () => {
  it('should setIn property in object', () => {
    const newObj = setIn(['propA', 'propBool'], true, {
      propA: { propBool: false },
    });
    expect(newObj.propA.propBool).toBeTruthy();
  });

  it('should set property in object', () => {
    const newObj = set('propA', true, { propA: false });
    expect(newObj.propA).toBeTruthy();
  });

  it('should get property in object', () => {
    const newObj = getIn(['propA', 'propB'], { propA: { propB: false } });
    expect(newObj).toBeFalsy();
  });

  it('should get prop or return default value', () => {
    const result = propOr(false, 'test', { test: true });
    expect(result).toBeTruthy();
  });

  it('should get prop by path or return default value', () => {
    const result = pathOr(0, ['test', 'nested'], { test: { nested: 1 } });
    expect(result).toBeTruthy();
  });
});
