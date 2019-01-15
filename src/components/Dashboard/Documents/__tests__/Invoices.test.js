import Invoices from '../Invoices';

const defaultProps = {};

const setup = buildSetup(Invoices, defaultProps);

describe('<Invoices />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('initial state isVisibleAddInvoice should be false ', () => {
    const { wrapper } = setup();
    expect(wrapper.state().isVisibleAddInvoice).toBe(false);
  });

  it('should show form if state isVisibleAddInvoice is true', () => {
    const { wrapper } = setup();
    wrapper.setState({ isVisibleAddInvoice: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('state isVisibleAddInvoice should be true after handleClick call ', () => {
    const { wrapper } = setup();
    wrapper.instance().handleClick();
    expect(wrapper.state().isVisibleAddInvoice).toBe(true);
  });
});
