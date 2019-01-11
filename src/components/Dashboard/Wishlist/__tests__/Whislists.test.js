import { Wishlist } from '../Wishlist';

const defaultProps = {
  products: [
    {
      productId: 'product-1',
      type: 'Printer',
      name: 'ZX3',
      price: 400,
      inStock: '30',
    },
    {
      productId: 'product-2',
      type: 'Printer',
      name: 'ZX5',
      price: 600,
      inStock: '5',
    },
  ],
  userId: '1234',
  getWishlist: jest.fn(),
  token: '12345',
  loaded: false,
  removeProd: jest.fn(),
  addProduct: jest.fn(),
  updateProduct: jest.fn(),
  idsProductsInCart: ['product-1'],
};

const setup = buildSetup(Wishlist, defaultProps);

describe('<Wishlist />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render products list if loaded true', () => {
    const { wrapper } = setup();
    wrapper.setProps({ loaded: true });
    expect(wrapper).toMatchSnapshot();
  });
  it('should call handleFetch with token', () => {
    const {
      wrapper,
      props: { userId, token },
    } = setup();
    expect(wrapper.instance().props.getWishlist).toHaveBeenCalledWith(userId, token);
  });
  it('should call removeProd if remove is call', () => {
    const {
      wrapper,
      props: { products, userId, token },
    } = setup();
    const { productId } = products[0];
    wrapper.instance().remove(productId);
    expect(wrapper.instance().props.removeProd).toHaveBeenCalledWith(productId, userId, token);
  });
  it('should call addProduct when products is not in cart and not call updateProduct', () => {
    const {
      wrapper,
      props: { products },
    } = setup();
    const instance = wrapper.instance();
    instance.handleClickToCart(products[1]);
    expect(wrapper.instance().props.updateProduct).not.toHaveBeenCalled();
    expect(wrapper.instance().props.addProduct).toHaveBeenCalledWith(products[1]);
  });

  it('should call update updateProduct when products is in cart and not call addProduct', () => {
    const {
      wrapper,
      props: { products },
    } = setup();
    const instance = wrapper.instance();
    instance.props.addProduct.mockClear();
    instance.handleClickToCart(products[0]);
    expect(wrapper.instance().props.updateProduct).toHaveBeenCalledWith(products[0]);
    expect(wrapper.instance().props.addProduct).not.toHaveBeenCalled();
  });
});
