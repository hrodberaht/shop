import NavBar from '../NavBar';

const setup = buildSetup(NavBar, {});

describe('<NavBar />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
