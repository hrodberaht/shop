import React from 'react';
import { Authorization } from '../Authorization';

const defaultProps = {
  auth: false,
  withAuth: <div>withAuth</div>,
  withOutAuth: <div>withOutAuth</div>,
};
const setup = buildSetup(Authorization, defaultProps);

describe('<Authorization />', () => {
  it('should generate without auth when auth is false', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').text()).toBe('withOutAuth');
  });

  it('should generate with auth when auth is true', () => {
    const { wrapper } = setup();
    wrapper.setProps({ auth: true });
    expect(wrapper.find('div').text()).toBe('withAuth');
  });
});
