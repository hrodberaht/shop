import { AdminProduct } from '../AdminProduct';

const defaultProps = {
  product: {
    id: 'product-1',
    type: 'Printer',
    name: 'ZX3',
    price: 400,
    inStock: 30,
    remove: false,
  },
  removeProd: jest.fn(),
  token: '1234',
  updateProductInDB: jest.fn(),
  undeletedProduct: jest.fn(),
};

const setup = buildSetup(AdminProduct, defaultProps);

describe('<AdminProduct />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('isEditVisable and isModalVisable in state should be false', () => {
    const { wrapper } = setup();
    expect(wrapper.state().isEditVisable).toBe(false);
    expect(wrapper.state().isModalVisable).toBe(false);
  });

  it('should change state after click button edit and show form', () => {
    const { wrapper } = setup();
    wrapper.find('#editButton').simulate('click');
    expect(wrapper.state().isEditVisable).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show undeleteButton when product is remove', () => {
    const { wrapper } = setup();
    wrapper.setProps({
      product: {
        id: 'product-1',
        type: 'Printer',
        name: 'ZX3',
        price: 400,
        inStock: 30,
        remove: true,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('should change state after click button close and hide form', () => {
    const { wrapper } = setup();
    wrapper.find('#editButton').simulate('click');
    wrapper.find('#closeButton').simulate('click');

    expect(wrapper.state().isEditVisable).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
  it('should call remove after call handleConfirmClick ', () => {
    const { wrapper } = setup();

    const {
      handleConfirmClick,
      props: {
        removeProd,
        token,
        product: { id },
      },
    } = wrapper.instance();
    wrapper.find('#removeButton').simulate('click');
    handleConfirmClick();

    expect(removeProd).toHaveBeenCalledWith(id, token);
  });

  it('state isVisableModal should change to true after click remove', () => {
    const { wrapper } = setup();
    wrapper.find('#removeButton').simulate('click');

    expect(wrapper.state().isModalVisable).toBe(true);
  });

  it('should call updateProductinDB after call submit ', () => {
    const { wrapper } = setup();
    wrapper.instance().submit();

    expect(wrapper.instance().props.updateProductInDB).toHaveBeenCalled();
  });

  it('should call undeletedProduct after click undeletedProductButton', () => {
    const {
      wrapper,
      props: {
        product: { id },
      },
    } = setup();
    wrapper.setProps({
      product: {
        id: 'product-1',
        type: 'Printer',
        name: 'ZX3',
        price: 400,
        inStock: 30,
        remove: true,
      },
    });
    wrapper.find('#undeleteProductButton').simulate('click');
    expect(wrapper.instance().props.undeletedProduct).toHaveBeenCalledWith(id);
  });
});
