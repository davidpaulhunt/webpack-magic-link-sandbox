import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Form from '../components/form';
import FormInput from '../components/form_input';

export default class SignupContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.router.push('/success');
  }

  render() {
    return (
      <div id="signup-wrapper">
        <Form
          name="signup"
          handleSubmit={this.handleSubmit}
        >
          <FormInput type="text" name="username" placeholder="3 to 25 characters" />
          <FormInput type="email" name="email" placeholder="you@rawesome.com" />
        </Form>
        <p>Already have an account? <Link to="/signin">Sign in</Link>.</p>
      </div>
    );
  }
}
