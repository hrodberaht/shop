import SellChart from '../SellChart';

const defaultProps = {
  data: [],
};

const setup = buildSetup(SellChart, defaultProps);

describe('<SellChart />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
