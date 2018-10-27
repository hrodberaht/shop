import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as yup from 'yup';

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
    .min(6)
    .max(16),
  companyId: yup.string().required(),
});

const asyncValidate = values => schema.validate(values, { abortEarly: false }).catch((err) => {
  const errorsForm = {};
  err.inner.forEach((error) => {
    errorsForm[error.path] = error.type;
  });
  throw errorsForm;
});

const addUserToDB = async (values) => {
  const errorsForm = {};
  return fetch('http://localhost:3004/registration', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then(data => data.json())
    .then((res) => {
      if (res.status === 422) {
        errorsForm.email = res.error;
        return errorsForm;
      }

      return res;
    });
};

export class Registration extends Component {
  submit = async (values) => {
    const check = await addUserToDB(values);
    if (check.error) {
      return Promise.resolve().then(() => {
        throw new SubmissionError({ email: check.error });
      });
    }

    return alert('User added');
  };

  renderField = ({
    input, label, type, meta: { touched, error },
  }) => (
    <div className="form-input">
      <input {...input} type={type} placeholder={label} />
      {touched && (error && <span>{error}</span>)}
    </div>
  );

  render() {
    const { handleSubmit, pristine } = this.props;
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
          <Field name="companyId" component="select">
            <option />
            <option value="com1">com1</option>
            <option value="com2">com2</option>
            <option value="com3">com3</option>
          </Field>
          <button className="btn btn-submit" type="submit" disabled={pristine}>
            Register
          </button>
        </form>
      </div>
    );
  }
}
export default reduxForm({
  asyncValidate,
  form: 'registration',
})(Registration);
