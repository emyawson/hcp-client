import { set, setIn } from './ramda.utils';

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
});
