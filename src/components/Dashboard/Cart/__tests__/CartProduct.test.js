import CartProduct from '../CartProduct';

const defaultProps = {
  product: {
    id: '1234',
    name: 'fx',
    price: 400,
    pcsOrder: 2,
    totalPrice: 800,
  },
  productAfterUpdate: {
    id: '1234',
    name: 'fx',
    price: 400,
    pcsOrder: 3,
    totalPrice: 1200,
  },
  remove: jest.fn(),
  changeQuantity: jest.fn(),
};
const setup = buildSetup(CartProduct, defaultProps);

describe('<CartProduct />', () => {
  it('should render witout crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('state quantity should be equal to product pcsOrder', () => {
    const { wrapper, props } = setup();
    expect(wrapper.state().quantity).toBe(props.product.pcsOrder);
  });
  it('should call remove after click', () => {
    const { wrapper } = setup();
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().props.remove).toHaveBeenCalled();
  });
  it('should change state if input value change', () => {
    const { wrapper } = setup();
    wrapper.find('input').simulate('change', { target: { value: '3' } });
    expect(wrapper.state().quantity).toBe(3);
  });

  it('should call changeQuantit with productAfterUpdate if input value change', () => {
    const { wrapper, props } = setup();
    wrapper.find('input').simulate('change', { target: { value: '3' } });
    expect(wrapper.instance().props.changeQuantity).toHaveBeenCalledWith(props.productAfterUpdate);
  });
  it('state should be 1 if input value is < 1 and ', () => {
    const { wrapper } = setup();
    wrapper.find('input').simulate('change', { target: { value: '-1' } });
    expect(wrapper.state().quantity).toBe(1);
  });
});
