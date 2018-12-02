import { Cart } from '../Cart';

const defaultProps = {
  cart: {
    productsInCart: ['1', '2'],
    list: ['1234', '5678'],
    byId: {
      1234: {
        id: '1234',
        productId: '1',
        name: 'fx',
        price: 400,
        pcsOrder: 2,
        totalPrice: 800,
      },
      5678: {
        id: '5678',
        productId: '2',
        name: 'fx2',
        price: 600,
        pcsOrder: 8,
        totalPrice: 4800,
      },
    },
    meta: {
      loaded: false,
      errors: [],
    },
  },
  emptyCart: jest.fn(),
  createOrder: jest.fn(),
  history: [],
  removeFrom: jest.fn(),
  userId: '1234',
  person: 'Tom Johns',
  token: '1234',
  orderPositionIds: [],
  change: jest.fn(),
  cartPosition: {
    id: '1234',
    name: 'fx',
    price: 400,
    pcsOrder: 3,
    totalPrice: 1200,
  },
};

const setup = buildSetup(Cart, defaultProps);

describe('<Cart />', () => {
  it('should render witout crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call empty cart after click', async () => {
    const { wrapper } = setup();
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().props.emptyCart).toHaveBeenCalled();
  });

  it('return sumary price', () => {
    const { wrapper } = setup();
    wrapper.instance().sumaryPrice();
    expect(wrapper.instance().sumaryPrice()).toBe(5600);
  });
  it('remove should call removeFrom', () => {
    const { wrapper } = setup();
    wrapper.instance().remove();
    expect(wrapper.instance().props.removeFrom).toHaveBeenCalled();
  });
  it('remove should call change', () => {
    const {
      wrapper,
      props: { cartPosition, token },
    } = setup();
    wrapper.instance().changeQuantity(cartPosition, token);
    expect(wrapper.instance().props.change).toHaveBeenCalledWith(cartPosition, token);
  });
});
