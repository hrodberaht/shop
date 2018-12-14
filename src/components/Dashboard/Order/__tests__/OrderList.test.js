import { OrdersPage } from '../OrdersPage';

const defaultProps = {
  orders: [
    {
      userId: 'user-3',
      person: 'Ben Morrison',
      totalPrice: 2600,
      status: 'realized',
      date: '2018-11-02T18:03:36.535Z',
      companyId: 'company-2',
      orderPositionIds: ['Ld6GsMELf', 'IQW79vU4W', '4VgGGnrnV'],
      id: 'e1oPVJh',
      productsOrder: [
        {
          productId: 'product-1',
          name: 'ZX3',
          price: 400,
          pcsOrder: 1,
          totalPrice: 400,
          id: 'Ld6GsMELf',
        },
        {
          productId: 'product-2',
          name: 'ZX5',
          price: 600,
          pcsOrder: 1,
          totalPrice: 600,
          id: 'IQW79vU4W',
        },
        {
          productId: 'product-3',
          name: 'ZX1',
          price: 200,
          pcsOrder: 8,
          totalPrice: 1600,
          id: '4VgGGnrnV',
        },
      ],
    },
  ],
  getOrdersFromServer: jest.fn(),
  handleClick: jest.fn(),
  loaded: false,
  token: '',
};
const setup = buildSetup(OrdersPage, defaultProps);

describe('<OrderList />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render if loaded true ', () => {
    const { wrapper } = setup();
    wrapper.setProps({ loaded: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('toggleUnrealizedOrders should change state after call', () => {
    const { wrapper } = setup();
    wrapper.instance().toggleUnrelizedOrders();
    expect(wrapper.state()).toEqual({ isOnlyUnrealizedOrders: true });
    wrapper.instance().toggleUnrelizedOrders();
    expect(wrapper.state()).toEqual({ isOnlyUnrealizedOrders: false });
  });
});
