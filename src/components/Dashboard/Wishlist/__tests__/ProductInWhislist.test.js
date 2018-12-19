import ProductInWishlist from '../ProductInWishlist';

const defaultProps = {
  product: {
    productId: 'product-1',
    type: 'Printer',
    name: 'ZX3',
    price: 400,
    inStock: '30',
  },
  remove: jest.fn(),
  handleClickToCart: jest.fn(),
};

const setup = buildSetup(ProductInWishlist, defaultProps);

describe('ProductInWishlist />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should call remove after click', () => {
    const {
      wrapper,
      props: {
        product: { productId },
      },
    } = setup();
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().props.remove).toHaveBeenCalledWith(productId);
  });
});
