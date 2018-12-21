import AddToCartButton from '../AddToCartButton';

const defaultProps = {
  product: {
    id: '1234',
    name: 'fx',
    price: 400,
    pcsOrder: 2,
    totalPrice: 800,
  },
  handleClickToCart: jest.fn(),
  className: 'btn',
  disabled: true,
};

const setup = buildSetup(AddToCartButton, defaultProps);

describe('<AddToCartButton />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleClickToCart', () => {
    const {
      wrapper,
      props: { product },
    } = setup();
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().props.handleClickToCart).toHaveBeenCalledWith(product);
  });
});
