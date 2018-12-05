import ComapaniesBuyChart from '../CompaniesBuyChart';

jest.mock('../../../shared/companiesBuyChart', () => jest.fn());

const defaultProps = {
  data: {
    orders: [{}, {}],
  },
};

const setup = buildSetup(ComapaniesBuyChart, defaultProps);

describe('<ComapaniesBuyChart />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
