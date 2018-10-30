import AddedToCart from '../AddedToCart';

const defaultProps = {
  product: {
    id: '1',
    name: 'fx',
    price: 400,
    pcsOrder: 2,
    totalPrice: 800,
  },
  show: jest.fn(),
  redirect: jest.fn(),
};

const setup = buildSetup(AddedToCart, defaultProps);

describe('<AddedToCart />', () => {
  it('should render witout crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call show after click', () => {
    const { wrapper } = setup();
    wrapper.find('#more').simulate('click');

    expect(wrapper.instance().props.show).toHaveBeenCalled();
  });

  it('should call redirect after click', () => {
    const { wrapper } = setup();
    wrapper.find('#cart').simulate('click');

    expect(wrapper.instance().props.redirect).toHaveBeenCalled();
  });
});
