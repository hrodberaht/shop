import { AddProductForm } from '../AddProductForm';

const defaultProps = {
  handleSubmit: jest.fn(),
};

const setup = buildSetup(AddProductForm, defaultProps);

describe('<AddProductForm />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
