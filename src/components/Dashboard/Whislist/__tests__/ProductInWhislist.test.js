import ProductInWhislist from '../ProductInWhislist';

const defaultProps = {
  product: {
    productId: 'product-1',
    type: 'Printer',
    name: 'ZX3',
    price: 400,
    inStock: '30',
  },
  remove: jest.fn(),
};

const setup = buildSetup(ProductInWhislist, defaultProps);

describe('ProductInWhislist />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should call remove after click', () => {
    const { wrapper, props } = setup();
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().props.remove).toHaveBeenCalledWith(props.product.productId);
  });
});
