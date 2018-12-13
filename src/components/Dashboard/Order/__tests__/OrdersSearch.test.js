import OrdersSearch from '../OrdersSearch';

const defaultProps = {
  handleCheck: jest.fn(),
  title: 'Search',
};

const setup = buildSetup(OrdersSearch, defaultProps);

describe('<OrdersSearch>', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleCheck if checkbox is clicked', () => {
    const { wrapper } = setup();
    wrapper.find('input').simulate('click');
    expect(wrapper.instance().props.handleCheck).toHaveBeenCalled();
  });
});
