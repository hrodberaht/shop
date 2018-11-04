import ProductsInOrder from '../ProductsInOrder';

const defaultProps = {
  order: {
    productsOrder: [
      {
        productId: 'product-1',
        name: 'ZX3',
        price: 400,
        pcsOrder: 1,
        totalPrice: 400,
        id: 'Ld6GsMELf',
      },
    ],
  },
};
const setup = buildSetup(ProductsInOrder, defaultProps);

describe('<ProductsInOrder />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
