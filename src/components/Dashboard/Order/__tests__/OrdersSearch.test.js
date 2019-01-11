import OrdersSearch from '../OrdersSearch';

const defaultProps = {
  handleSelect: jest.fn(),
  handleChange: jest.fn(),
  title: 'Search',
};

const setup = buildSetup(OrdersSearch, defaultProps);

describe('<OrdersSearch>', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSelect if value is selected', () => {
    const { wrapper } = setup();
    wrapper.find('select').simulate('change', { target: { value: 'realized' } });
    expect(wrapper.instance().props.handleSelect).toHaveBeenCalled();
  });
  it('should call handleChange if if input value change', () => {
    const { wrapper } = setup();
    wrapper.find('input').simulate('change', { target: { value: 'a' } });
    expect(wrapper.instance().props.handleChange).toHaveBeenCalled();
  });
});
