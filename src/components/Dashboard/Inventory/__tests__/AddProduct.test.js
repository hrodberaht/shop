import { AddProduct } from '../AddProduct';

const defaultProps = {
  token: '1234',
  addProductToDB: jest.fn(),
  clearForm: jest.fn(),
};

const setup = buildSetup(AddProduct, defaultProps);

describe('<AddProduct />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should call addProductToDb and clearForm when submit', () => {
    const { wrapper } = setup();
    wrapper.instance().submit();
    expect(wrapper.instance().props.addProductToDB).toHaveBeenCalled();
    expect(wrapper.instance().props.clearForm).toHaveBeenCalled();
  });
});
