import * as enzyme from 'enzyme';
import * as React from 'react';

import { Div } from './div.component';

describe('div test suite', () => {
  it('should allow the user to define a div', () => {
    const tree = enzyme.shallow(
      <div>
        <Div />
      </div>,
    );
    expect(tree.contains(<Div />)).toBe(true);
  });
  describe('div props suite', () => {
    it('should allow you to define a width', () => {
      const tree = enzyme.shallow(
        <Div width="100vh" maxWidth="200px" minWidth="100px" />,
      );
      expect(tree).toHaveStyleRule('width', '100vh');
      expect(tree).toHaveStyleRule('max-width', '200px');
      expect(tree).toHaveStyleRule('min-width', '100px');
    });
    it('should allow you to define a height', () => {
      const tree = enzyme.shallow(
        <Div height="100vh" minHeight="200px" maxHeight="300px" />,
      );
      expect(tree).toHaveStyleRule('height', '100vh');
      expect(tree).toHaveStyleRule('min-height', '200px');
      expect(tree).toHaveStyleRule('max-height', '300px');
    });
    it('should allow you to define flex', () => {
      const tree = enzyme.shallow(
        <Div
          flex
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          justifySelf="flex-start"
          alignSelf="flex-start"
          flexDirection="row"
        />,
      );
      expect(tree).toHaveStyleRule('flex-wrap', 'wrap');
      expect(tree).toHaveStyleRule('flex', 'true');
      expect(tree).toHaveStyleRule('align-self', 'flex-start');
      expect(tree).toHaveStyleRule('align-items', 'center');
      expect(tree).toHaveStyleRule('justify-content', 'center');
      expect(tree).toHaveStyleRule('justify-self', 'flex-start');
      expect(tree).toHaveStyleRule('flex-direction', 'row');
    });
    it('should allow you to define background color', () => {
      const tree = enzyme.shallow(<Div bg="red" />);
      expect(tree).toHaveStyleRule('background-color', 'red');
    });
    it('should allow you to define margin', () => {
      const margins = enzyme.shallow(
        <Div ml="2px" mr="2px" mt="2px" mb="2px" />,
      );
      const marginAll = enzyme.shallow(<Div m="2px" />);

      expect(margins).toHaveStyleRule('margin-left', '2px');
      expect(margins).toHaveStyleRule('margin-right', '2px');
      expect(margins).toHaveStyleRule('margin-top', '2px');
      expect(margins).toHaveStyleRule('margin-bottom', '2px');
      expect(marginAll).toHaveStyleRule('margin', '2px');
    });
    it('should allow you to define padding', () => {
      const paddings = enzyme.shallow(
        <Div pl="2px" pr="2px" pt="2px" pb="2px" />,
      );
      const paddingAll = enzyme.shallow(<Div p="2px" />);

      expect(paddings).toHaveStyleRule('padding-left', '2px');
      expect(paddings).toHaveStyleRule('padding-right', '2px');
      expect(paddings).toHaveStyleRule('padding-top', '2px');
      expect(paddings).toHaveStyleRule('padding-bottom', '2px');
      expect(paddingAll).toHaveStyleRule('padding', '2px');
    });
    it('should allow you to define position', () => {
      const position = enzyme.shallow(
        <Div
          position="absolute"
          right="2px"
          top="2px"
          left="2px"
          bottom="2px"
        />,
      );
      expect(position).toHaveStyleRule('position', 'absolute');
      expect(position).toHaveStyleRule('left', '2px');
      expect(position).toHaveStyleRule('right', '2px');
      expect(position).toHaveStyleRule('top', '2px');
      expect(position).toHaveStyleRule('bottom', '2px');
    });
  });
});
