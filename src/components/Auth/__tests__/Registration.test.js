import fetchMock from 'fetch-mock/es5/client';
import { Registration } from '../Registration';
import config from '../../../config/config';

const defaultProps = {
  handleSubmit: jest.fn(),
};
const setup = buildSetup(Registration, defaultProps);

afterEach(() => {
  fetchMock.restore();
});

describe('<Registration />', () => {
  it('should render without crash', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('fetchCompanies set error in state if server not working', async () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    fetchMock.get(`${config.url}companies`, { throws: Error });
    await instance.fetchCompanies();
    expect(wrapper.state().error).toBe('Server not working');
  });

  it('fetchCompanies set companies in state, and loaded to true ', async () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const companies = [
      {
        id: 'company-1',
        name: 'IBM',
      },
    ];
    fetchMock.get(`${config.url}companies`, {
      headers: { 'content-type': 'application/json' },
      body: companies,
    });
    await instance.fetchCompanies();
    expect(wrapper.state().companies).toEqual(companies);
    expect(wrapper.state().loaded).toEqual(true);
  });

  it('addUserToDB should return error if status 422 ', async () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const error = { error: 'email is taken' };
    fetchMock.post(`${config.url}registration`, {
      status: 422,
      body: error,
    });
    expect(await instance.addUserToDB()).toEqual(error);
  });

  it('addUserToDB should return response', async () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const response = { message: 'user added' };
    fetchMock.post(`${config.url}registration`, {
      status: 422,
      body: response,
    });
    await instance.addUserToDB();
    expect(await instance.addUserToDB()).toEqual(response);
  });

  it('submit should call addUserToDB with values', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const values = {
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
      password: '123456',
      companyId: 'test',
    };
    jest.spyOn(instance, 'addUserToDB');
    instance.submit(values);
    expect(instance.addUserToDB).toHaveBeenCalledWith(values);
  });

  it('selectOptions() creact select options with companies', () => {
    const { wrapper } = setup();
    const companies = [
      {
        id: 'company-1',
        name: 'IBM',
      },
      {
        id: 'company-2',
        name: 'Apple',
      },
    ];
    const instance = wrapper.instance();
    wrapper.setState({ companies });
    expect(instance.selectOptions()).toMatchSnapshot();
  });

  it('after submit form, call handleSubmit with submit', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit');
    expect(instance.props.handleSubmit).toHaveBeenCalledWith(instance.submit);
  });
});
