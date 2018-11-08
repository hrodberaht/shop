import { Whislist } from '../Whislist';

const defaultProps = {
  products: [
    {
      id: 'product-1',
      type: 'Printer',
      name: 'ZX3',
      price: '400',
      inStock: '30',
    },
    {
      id: 'product-2',
      type: 'Printer',
      name: 'ZX5',
      price: '600',
      inStock: '5',
    },
  ],
  getWishlist: jest.fn(),
  token: '12345',
  loaded: false,
};

const setup = buildSetup(Whislist, defaultProps);

describe('<Whislist />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  //   it('should render products list if loaded true', () => {
  //     const { wrapper } = setup();
  //     wrapper.setProps({ loaded: true });
  //     expect(wrapper).toMatchSnapshot();
  //   });

  //   it('should call handleFetch with token', () => {
  //     const { wrapper } = setup();
  //     expect(wrapper.instance().props.handleFetch).toHaveBeenCalledWith('12345');
  //   });
});
