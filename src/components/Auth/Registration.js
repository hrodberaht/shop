import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import * as yup from 'yup';
import dataFetcher from '../../shared/dataFetcher';

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup
    .string()
    .required()
    .min(6),
  companyId: yup.string().required(),
});

const asyncValidate = values => schema.validate(values, { abortEarly: false }).catch((err) => {
  const errorsForm = {};
  err.inner.forEach((error) => {
    errorsForm[error.path] = error.type;
  });
  throw errorsForm;
});

export class Registration extends Component {
  state = {
    companies: [],
    loaded: false,
    error: false,
  };

  componentDidMount() {
    this.fetchCompanies();
  }

  fetchCompanies = () => dataFetcher('companies', 'get')
    .then((data) => {
      this.setState({ companies: data, loaded: true });
    })
    .catch(() => {
      this.setState({ error: 'Server not working' });
    });

  addUserToDB = (values) => {
    const errorsForm = {};
    return dataFetcher('registration', 'post', null, values).then((res) => {
      if (res.status === 422) {
        errorsForm.email = res.error;
        return errorsForm;
      }

      return res;
    });
  };

  submit = async (values) => {
    const check = await this.addUserToDB(values);
    if (check.error) {
      return Promise.resolve().then(() => {
        throw new SubmissionError({ email: check.error });
      });
    }
    alert('User added');
    return this.props.history.push('/');
  };

  renderField = ({
    input, label, type, meta: { touched, error },
  }) => (
    <div>
      <input className="form-input" {...input} type={type} placeholder={label} />
      <p className="error-text">{touched && (error && <span>{error}</span>)}</p>
    </div>
  );

  selectOptions = () => (
    <React.Fragment>
      <option />
      {this.state.companies.map(company => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </React.Fragment>
  );

  render() {
    const { handleSubmit, pristine } = this.props;
    if (this.state.error) return <div>{this.state.error}</div>;
    return (
      <div className="registration-form">
        <form onSubmit={handleSubmit(this.submit)}>
          <label className="form-label" htmlFor="email">
            <p>Email:</p>
            <Field name="email" type="text" component={this.renderField} label="Email" />
          </label>
          <label className="form-label" htmlFor="first-name">
            <p>First name:</p>
            <Field name="firstName" type="text" component={this.renderField} label="First name" />
          </label>
          <label className="form-label" htmlFor="last-name">
            <p>Last name:</p>
            <Field name="lastName" type="text" component={this.renderField} label="Last name" />
          </label>
          <label className="form-label" htmlFor="password">
            <p>Password:</p>
            <Field name="password" type="password" component={this.renderField} label="Password" />
          </label>
          <label className="form-label" htmlFor="password">
            <p>Your Company</p>
            <Field className="registration-select" name="companyId" component="select">
              {this.state.loaded && this.selectOptions()}
            </Field>
          </label>
          <button className="btn btn-submit" type="submit" disabled={pristine}>
            Submit
          </button>
          <div className="registration-link">
            <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    );
  }
}

withRouter(Registration);
export default reduxForm({
  asyncValidate,
  form: 'registration',
})(Registration);
