import SellChart from '../SellChart';
import * as chart from '../../../shared/createSellChart';

jest.mock('../../../shared/createSellChart');

const defaultProps = {
  data: [],
};

const setup = buildSetup(SellChart, defaultProps);

describe('<SellChart />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('should call createSellChart', () => {
    const {
      props: { data },
    } = setup();
    const spy = jest.spyOn(chart, 'default');
    expect(spy).toHaveBeenCalledWith(data);
  });
});
