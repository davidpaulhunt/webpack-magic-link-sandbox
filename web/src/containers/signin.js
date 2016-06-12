import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Form from '../components/form';
import FormInput from '../components/form_input';

export default class SigninContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.router.push('/success');
  }

  render() {
    return (
      <div id="sigin-wrapper">
        <Form
          name="signin"
          handleSubmit={this.handleSubmit}
        >
          <FormInput name="email" type="email" placeholder="you@areawesome.com" />
        </Form>
        <p>Signed in? Go to <Link to="/dashboard">dashboard</Link>.</p>
        <p>Don't have an account? Sign up <Link to="/signup">here</Link>.</p>
      </div>
    );
  }
}
