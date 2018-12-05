import { Analytics } from '../Analytics';

const defaultProps = {
  soldProducts: jest.fn(),
  userId: '1234',
  dataSellChart: [],
};

const setup = buildSetup(Analytics, defaultProps);

describe('<Analytics />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
