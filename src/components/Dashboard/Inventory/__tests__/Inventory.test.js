import Inventory from '../Inventory';

const setup = buildSetup(Inventory);

describe('<Inventory />', () => {
  it('should render witout crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should show AddProduct if toggle is true', () => {
    const { wrapper } = setup();
    wrapper.setState({ toggleAddProduct: true });
    expect(wrapper).toMatchSnapshot();
  });
  it('should change state after click button ', () => {
    const { wrapper } = setup();
    wrapper.find('button').simulate('click');

    expect(wrapper.state().toggleAddProduct).toBe(true);
  });
});
