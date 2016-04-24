// < Login/> Component
// ===================
//
// This file defines the Redux Form component `< Login/>`.
//
// Import Modules
// --------------
//
// ### NPM Modules

import React from 'react';
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';

// ### Local Modules

import {defaultFormValues} from 'scripts/configs';

// Define & Export Module
// ----------------------
//
// This module contains the ***Redux-Form-connected `< Login/>`***.

export default
@connectForm({
  form: 'Login',
  fields: ['email', 'password'],
  initialValues: defaultFormValues.Login
})
class Login extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  }

  // ### Render
  //
  // Note that `fields`, `onSubmit` and `handleSubmit` are special props offered by Redux Form.
  //
  // See also https://github.com/erikras/redux-form#-handlesubmit--function.

  render () {
    const {
      input: {UI},
      fields: {email, password},
      handleSubmit
    } = this.props;

    return (
      <form
        onSubmit = {handleSubmit}
      >
        <div className = 'row'>
          <div className = 'columns'>
            <h1
              className = 'text-center'
              style = {{
                margin: '60px 0 60px 0'
              }}
            >Colloquium.me Admin Dashboard</h1>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns small-8 small-centered'>
            <input
              {...email}
              type = 'text'
              placeholder = 'Your Email'
            />
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns small-8 small-centered'>
            <input
              {...password}
              type = 'password'
              placeholder = 'Your Password'
            />
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns small-8 small-centered'>
            <button
              className = {classnames('expanded button', {
                alert: UI.hasError
              })}
            >
              {UI.hasError ? 'Incorrect Login Information' : 'Login'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
