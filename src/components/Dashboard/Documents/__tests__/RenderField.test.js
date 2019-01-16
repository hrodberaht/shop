import RenderField from '../RenderField';

const defaultProps = {
  label: 'Company'
};

const setup = buildSetup(RenderField, defaultProps);

describe('<RenderField />', () => {
  describe('when initialized', () => {
    it('should render without crash', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
