import ComapaniesBuyChart from '../CompaniesBuyChart';
import * as chart from '../../../shared/createChartPurchaseByCompanies';

jest.mock('../../../shared/createChartPurchaseByCompanies');

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

  it('should call companiesBuyChart', () => {
    const {
      props: { data },
    } = setup();
    const spy = jest.spyOn(chart, 'default');
    expect(spy).toHaveBeenCalledWith(data);
  });
});
