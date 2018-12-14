import OrdersSearch from '../OrdersSearch';

const defaultProps = {
  handleSelect: jest.fn(),
  title: 'Search',
};

const setup = buildSetup(OrdersSearch, defaultProps);

describe('<OrdersSearch>', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSelect if checkbox is clicked', () => {
    const { wrapper } = setup();
    wrapper.find('select').simulate('change', { target: { value: 'realized' } });
    expect(wrapper.instance().props.handleSelect).toHaveBeenCalled();
  });
});
