import { Registration } from '../Registration';

const defaultProps = {
  handleSubmit: jest.fn(),
};
const setup = buildSetup(Registration, defaultProps);

describe('<Registration />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
