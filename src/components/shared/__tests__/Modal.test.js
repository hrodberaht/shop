import Modal from '../Modal';

const defaultProps = {
  handleCancelClick: jest.fn(),
  handleConfirmClick: jest.fn(),
};

const setup = buildSetup(Modal, defaultProps);

describe('<Modal />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleCancelClick after click on cancel button', () => {
    const { wrapper } = setup();
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(wrapper.instance().props.handleCancelClick).toHaveBeenCalled();
  });
  it('should call handleConfirmClick after click on confirm button', () => {
    const { wrapper } = setup();
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(wrapper.instance().props.handleConfirmClick).toHaveBeenCalled();
  });
});
