import { OrdersPage } from '../OrdersPage';

const defaultProps = {
  orders: [],
  loaded: false,
  getOrdersFromServer: jest.fn(),
  token: '1234',
  userId: '1a2a',
};
const setup = buildSetup(OrdersPage, defaultProps);

describe('<OrdersPage />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should call getOrdersFromServer when component did mount', () => {
    const {
      wrapper,
      props: { token, userId },
    } = setup();
    expect(wrapper.instance().props.getOrdersFromServer).toHaveBeenCalledWith(userId, token);
  });
  it('state should be', () => {
    const { wrapper } = setup();
    expect(wrapper.state()).toEqual({
      status: 'all',
      id: '',
    });
  });

  it('should change state after call handleSelect', () => {
    const { wrapper } = setup();
    const e = { target: { value: 'realized' } };
    wrapper.instance().handleSelect(e);
    expect(wrapper.state('status')).toBe('realized');
  });
  it('should change state after call handleChange', () => {
    const { wrapper } = setup();
    const e = { target: { value: 'a' } };
    wrapper.instance().handleChange(e);
    expect(wrapper.state('id')).toBe('a');
  });
  it('should render if loaded true ', () => {
    const { wrapper } = setup();
    wrapper.setProps({ loaded: true });
    expect(wrapper).toMatchSnapshot();
  });
});
