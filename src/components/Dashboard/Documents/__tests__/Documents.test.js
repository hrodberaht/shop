import Documents from '../Documents';

const defaultProps = {};

const setup = buildSetup(Documents, defaultProps);

describe('<Documents />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
