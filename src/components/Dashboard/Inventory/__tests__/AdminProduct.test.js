import { AdminProduct } from '../AdminProduct';

const defaultProps = {
  product: {
    id: 'product-1',
    type: 'Printer',
    name: 'ZX3',
    price: 400,
    inStock: 30,
  },
  removeProd: jest.fn(),
  token: '1234',
  updateProductInDB: jest.fn(),
};

const setup = buildSetup(AdminProduct, defaultProps);

describe('<AdminProduct />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('toggleEdit in state should be false', () => {
    const { wrapper } = setup();
    expect(wrapper.state().toggleEdit).toBe(false);
  });
  it('should change state after click button edit and show form', () => {
    const { wrapper } = setup();
    wrapper.find('#editButton').simulate('click');
    expect(wrapper.state().toggleEdit).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  it('should change state after click button close and hide form', () => {
    const { wrapper } = setup();
    wrapper.find('#editButton').simulate('click');
    wrapper.find('#closeButton').simulate('click');

    expect(wrapper.state().toggleEdit).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
  it('should call remove after click button X ', () => {
    const { wrapper } = setup();
    wrapper.find('#removeButton').simulate('click');
    const {
      token,
      product: { id },
    } = wrapper.instance().props;

    expect(wrapper.instance().props.removeProd).toHaveBeenCalledWith(id, token);
  });

  it('should call updateProductinDB after call submit ', () => {
    const { wrapper } = setup();
    wrapper.instance().submit();

    expect(wrapper.instance().props.updateProductInDB).toHaveBeenCalled();
  });
});
