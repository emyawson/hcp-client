import * as TemplateUtils from './templates.utils';

describe('tests for template utils', () => {
  it('should define the following functions', () => {
    expect(true).toBe(true);
    expect(TemplateUtils.parse).toBeDefined();
  });
});
