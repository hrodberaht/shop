import React from 'react';
import RenderSelect from '../RenderSelect';

const defaultProps = {};

const setup = buildSetup(RenderSelect, defaultProps);

describe('<RenderSelect />', () => {
  describe('when initialized', () => {
    it('should render without crash', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when children props set', () => {
    const options = <option>5%</option>;

    it('should render children', () => {
      const { wrapper } = setup();
      wrapper.setProps({ children: options });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
