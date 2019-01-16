import ShowErrorInForm from '../ShowErrorInForm';

const defaultProps = {
  touched: false,
  error: null,
  className: 'btn'
};

const setup = buildSetup(ShowErrorInForm, defaultProps);

describe('<ShowErrorInForm />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('when touched should show error', () => {
    const { wrapper } = setup();
    wrapper.setProps({ touched: true, error: 'error' });
    expect(wrapper).toMatchSnapshot();
  });
});
