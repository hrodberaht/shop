import CartProduct from '../CartProduct';

const defaultProps = {
  product: {
    name: 'fx',
    price: 400,
    pcsOrder: 2,
    totalPrice: 800,
  },
  remove: jest.fn(),
};
const setup = buildSetup(CartProduct, defaultProps);

describe('<CartProduct />', () => {
  it('should render witout crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should call remove after click', () => {
    const { wrapper } = setup();
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().props.remove).toHaveBeenCalled();
  });
});
