import { AdminProductsList } from '../AdminProductsList';

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
      name: 'ZX8',
      price: '800',
      inStock: '40',
    },
  ],
  token: '1234',
  loaded: false,
  getProducts: jest.fn(),
};

const setup = buildSetup(AdminProductsList, defaultProps);

describe('<AdminProductsList />', () => {
  it('should render loading component if loaded false', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render list product component if loaded true', () => {
    const { wrapper } = setup();
    wrapper.setProps({ loaded: true });
    expect(wrapper).toMatchSnapshot();
  });
  it('should call getProducts if componentDiDMount', () => {
    const { wrapper } = setup();
    expect(wrapper.instance().props.getProducts).toHaveBeenCalled();
  });
});
