import Invoices from '../Invoices';

const defaultProps = {};

const setup = buildSetup(Invoices, defaultProps);

describe('<Invoices />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('initial state isVisableAddInvoice should be false ', () => {
    const { wrapper } = setup();
    expect(wrapper.state().isVisableAddInvoice).toBe(false);
  });

  it('should show form if state isVisableAddInvoice is true', () => {
    const { wrapper } = setup();
    wrapper.setState({ isVisableAddInvoice: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('state isVisableAddInvoice should be true after handleClick call ', () => {
    const { wrapper } = setup();
    wrapper.instance().handleClick();
    expect(wrapper.state().isVisableAddInvoice).toBe(true);
  });
});
