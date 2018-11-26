import { SideBar } from '../SideBar';

const defaultProps = {
  toggleSidebar: true,
};
const setup = buildSetup(SideBar, defaultProps);

describe('<SideBar />', () => {
  it('should render with side bar if toggleSidebar is true', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with hide sidebar if toggleSidebar is false', () => {
    const { wrapper } = setup();
    wrapper.setProps({ toggleSidebar: false });
    expect(wrapper).toMatchSnapshot();
  });
});
