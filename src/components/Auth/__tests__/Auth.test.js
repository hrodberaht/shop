import Auth from '../Auth';

const setup = buildSetup(Auth, {});

describe('<Auth />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
