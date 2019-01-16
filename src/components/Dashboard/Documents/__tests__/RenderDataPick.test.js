import RenderDataPick from '../RenderDataPick';

const defaultProps = {
  input: {
    onChange: jest.fn()
  }
};

const setup = buildSetup(RenderDataPick, defaultProps);

describe('<RenderDataPick />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
