const interpolationPattern = /([^{}]*)({{([^}:]*)(:([^}:]*))?}})?/g;

export const parse = (pattern: string, options) => {
  let result: Array<() => any | any> = [];

  pattern.replace(interpolationPattern, (_, text, __, name, ___, type) => {
    if (text) {
      result = [...result, text];
    }

    const componentType = type || options.defaultComponent || 'text';
    const component = options.render[componentType];
    const value = options.state[name];

    if (component && value) {
      result = [...result, component(value)];
    }

    return '';
  });

  return result;
};

const startInterpolation = '{{';
const endInterpolation = '}}';

const extractionPattern = new RegExp(
  `${startInterpolation}([^\}]*)${endInterpolation}`,
  'g',
);

// TODO: order provided by below function should be correct after translation of the template
export const getOrderedListOfFieldsInTemplate = (
  template: string,
  fieldPattern = extractionPattern,
) => {
  return (template.match(fieldPattern) || []).map(match =>
    match.slice(
      startInterpolation.length, // cut each match until the end of the start of the interpolation sequence
      match.indexOf(':'), // and until the first colon
    ),
  );
};
