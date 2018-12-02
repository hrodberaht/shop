import SideBar from '../SideBar';

const setup = buildSetup(SideBar, {});

describe('<SideBar />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
