import { Cart } from '../Cart';

const defaultProps = {
  products: [
    {
      id: '1',
      name: 'fx',
      price: 400,
      pcsOrder: 2,
      totalPrice: 800,
    },
    {
      id: '2',
      name: 'fx2',
      price: 600,
      pcsOrder: 8,
      totalPrice: 4800,
    },
  ],
  emptyCart: jest.fn(),
  history: [],
};

const setup = buildSetup(Cart, defaultProps);

describe('<Cart />', () => {
  it('should render witout crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call empty cart after click', () => {
    const { wrapper } = setup();
    wrapper.find('button').simulate('click');

    expect(wrapper.instance().props.emptyCart).toHaveBeenCalled();
  });

  it('return sumary price', () => {
    const { wrapper } = setup();
    wrapper.instance().sumaryPrice();
    expect(wrapper.instance().sumaryPrice()).toBe(5600);
  });
});
