import React from 'react';
import withDataFromGraphql from '../withDataFromGraphql';

const defaultProps = {
  fetchedData: {
    data: {
      orders: [{}, {}],
    },
    loading: true,
    error: null,
  },
};

const mockComponent = () => <p>Fake component</p>;

const componentWithHOC = withDataFromGraphql(mockComponent);

const setup = buildSetup(componentWithHOC, defaultProps);

describe('<withDataFromGrapql />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render mockComponent if loading false', () => {
    const {
      wrapper,
      props: { fetchedData },
    } = setup();
    wrapper.setProps({ fetchedData: { ...fetchedData, loading: false } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render error if error and loading false', () => {
    const {
      wrapper,
      props: { fetchedData },
    } = setup();
    wrapper.setProps({ fetchedData: { ...fetchedData, loading: false, error: 'error' } });
    expect(wrapper).toMatchSnapshot();
  });
});
