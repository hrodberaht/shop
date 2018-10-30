import CartProduct from '../CartProduct';

const defaultProps = {
  product: {
    name: 'fx',
    price: 400,
    pcsOrder: 2,
    totalPrice: 800,
  },
};
const setup = buildSetup(CartProduct, defaultProps);

describe('<CartProduct />', () => {
  it('should render witout crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
