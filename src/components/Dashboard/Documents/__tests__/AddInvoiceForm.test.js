import { AddInvoiceForm } from '../AddInvoiceForm';

const defaultProps = {
  handleSubmit: jest.fn(),
  addInvoice: jest.fn(),
  reset: jest.fn(),
  change: jest.fn(),
  productsInStore: []
};

const setup = buildSetup(AddInvoiceForm, defaultProps);

describe('<AddInvoiceForm />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('when form submit', () => {
    it('should call handleSubmit with submit', () => {
      const { wrapper } = setup();
      const {
        submit,
        props: { handleSubmit }
      } = wrapper.instance();

      wrapper.find('form').simulate('submit', { preventDefault() {} });
      expect(handleSubmit).toHaveBeenCalledWith(submit);
    });

    it('should call reset', () => {
      const { wrapper } = setup();
      const {
        submit,
        props: { reset }
      } = wrapper.instance();
      submit();
      expect(reset).toHaveBeenCalled();
    });

    it('should call addInvoice', () => {
      const { wrapper } = setup();
      const {
        submit,
        props: { addInvoice }
      } = wrapper.instance();
      submit();
      expect(addInvoice).toHaveBeenCalled();
    });
  });
});
