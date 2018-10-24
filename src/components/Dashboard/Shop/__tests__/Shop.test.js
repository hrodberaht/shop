import Shop from '../Shop';

const setup = buildSetup(Shop, {});

describe('<Shop />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
