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
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(wrapper.instance().props.remove).toHaveBeenCalledWith(productId);
  });

  it('should call handleClickToCart when click', () => {
    const {
      wrapper,
      props: { product },
    } = setup();
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(wrapper.instance().props.handleClickToCart).toHaveBeenCalledWith(product);
  });
});
