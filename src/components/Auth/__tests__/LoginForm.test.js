import { LoginForm } from '../LoginForm';

const defaultProps = {
  handleLogin: jest.fn(),
};
const setup = buildSetup(LoginForm, defaultProps);

const setValuesToInputs = (wrapper) => {
  wrapper.find('#email').simulate('change', { target: { value: 'test@test.pl', id: 'email' } });
  wrapper.find('#password').simulate('change', { target: { value: '1234', id: 'password' } });
};

describe('<LoginForm />', () => {
  it('should render witout crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleLogin with parameters email and password after submit', () => {
    const { wrapper } = setup();
    setValuesToInputs(wrapper);
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(wrapper.instance().props.handleLogin).toHaveBeenCalledWith('test@test.pl', '1234');
  });

  it('after set value to input the state should change', () => {
    const { wrapper } = setup();
    setValuesToInputs(wrapper);
    expect(wrapper.state()).toEqual({ email: 'test@test.pl', password: '1234' });
  });

  it('should clear state after submit', () => {
    const { wrapper } = setup();
    setValuesToInputs(wrapper);
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(wrapper.state()).toEqual({ email: '', password: '' });
  });
});
