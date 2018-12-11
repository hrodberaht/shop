import { Product } from '../Product';

const defaultProps = {
  product: {
    name: 'test',
    type: 'printer',
    price: 12.0,
    inStock: 30,
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

  it('should show diffrent icon for diffrent value inStock', () => {
    const { wrapper } = setup();
    wrapper.setProps({ product: { inStock: 0 } });
    expect(wrapper.find('#stock-message').props().children).toMatchSnapshot('empty battery');
    wrapper.setProps({ product: { inStock: 10 } });
    expect(wrapper.find('#stock-message').props().children).toMatchSnapshot('quater battery');
    wrapper.setProps({ product: { inStock: 11 } });
    expect(wrapper.find('#stock-message').props().children).toMatchSnapshot('medium battery');
    wrapper.setProps({ product: { inStock: 101 } });
    expect(wrapper.find('#stock-message').props().children).toMatchSnapshot('full battery');
  });

  it('should caltulate total price', () => {
    const { wrapper } = setup();
    wrapper.find('input').simulate('change', { target: { value: 1 } });
    expect(wrapper.find('#total-price').text()).toBe('$12.00');
  });

  it('should check is enough products in stock', () => {
    const { wrapper } = setup();
    wrapper.find('input').simulate('change', { target: { value: 31 } });
    expect(wrapper.find('#stock-error').text()).toBe('Not enough products');
    wrapper.find('input').simulate('change', { target: { value: 29 } });
    expect(wrapper.find('#stock-error').text()).toBe('');
  });
});
