import { Product } from '../Product';

const defaultProps = {
  product: {
    name: 'test',
    type: 'printer',
    price: '12',
    inStock: '30',
  },
  addProduct: jest.fn(),
  token: '1234',
  updateProduct: jest.fn(),
  userId: '12',
  addToWish: jest.fn(),
};
const setup = buildSetup(Product, defaultProps);

describe('<Product />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should show diffrent text message for diffrent value inStock', () => {
    const { wrapper } = setup();
    wrapper.setProps({ product: { inStock: '0' } });
    expect(wrapper.find('#stock-message').text()).toBe('not available');
    wrapper.setProps({ product: { inStock: '10' } });
    expect(wrapper.find('#stock-message').text()).toBe('last pieces');
    wrapper.setProps({ product: { inStock: '11' } });
    expect(wrapper.find('#stock-message').text()).toBe('medium supply');
    wrapper.setProps({ product: { inStock: '101' } });
    expect(wrapper.find('#stock-message').text()).toBe('full supply');
  });

  it('should caltulate total price', () => {
    const { wrapper } = setup();
    wrapper.find('input').simulate('change', { target: { value: 1 } });
    expect(wrapper.find('#total-price').text()).toBe('$12');
  });

  it('should check is enough products in stock', () => {
    const { wrapper } = setup();
    wrapper.find('input').simulate('change', { target: { value: 31 } });
    expect(wrapper.find('#stock-error').text()).toBe('Not enough products');
    wrapper.find('input').simulate('change', { target: { value: 29 } });
    expect(wrapper.find('#stock-error').text()).toBe('');
  });
});
