import RenderProducts from '../RenderProducts';

const defaultProps = {
  fields: [],
  change: jest.fn(),
  productsInStore: [],
  meta: {
    submitFailed: false
  }
};

const setup = buildSetup(RenderProducts, defaultProps);

describe('<RenderProducts />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
