import Order from '../Order';

const defaultProps = {
  order: {
    id: '1234',
    userId: '2345',
    data: '12.13.12',
    totalPrice: 400,
    status: 'in-progress',
  },
};
const setup = buildSetup(Order, defaultProps);

describe('<Order />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
