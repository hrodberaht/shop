import Header from '../Header';

const setup = buildSetup(Header, {});

describe('<Header />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
