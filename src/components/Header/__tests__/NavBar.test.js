import { SideBar } from '../SideBar';

const defaultProps = {
  toggleSidebar: true,
};
const setup = buildSetup(SideBar, defaultProps);

describe('<SideBar />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
