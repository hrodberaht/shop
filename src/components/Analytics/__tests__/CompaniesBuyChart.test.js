import { CompaniesBuyChart } from '../CompaniesBuyChart';
import * as chart from '../../../shared/createChartPurchaseByCompanies';

jest.mock('../../../shared/createChartPurchaseByCompanies');

const defaultProps = {
  fetchedData: {
    data: {
      orders: [{}, {}],
    },
    loading: false,
  },
};

const setup = buildSetup(CompaniesBuyChart, defaultProps);

describe('<ComapaniesBuyChart />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call companiesBuyChart', () => {
    const {
      props: { fetchedData },
    } = setup();
    const spy = jest.spyOn(chart, 'default');
    expect(spy).toHaveBeenCalledWith(fetchedData.data);
  });
});
