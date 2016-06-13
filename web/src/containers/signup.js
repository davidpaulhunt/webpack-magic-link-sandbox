import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Form from '../components/form';
import FormInput from '../components/form_input';
import request from 'superagent';

export default class SignupContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const params = {
      username: form.querySelector('[name="username"]').value,
      email: form.querySelector('[name="email"]').value,
    };

    request.post('/api/auth/signup')
      .send(params)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (res.statusCode === 200) {
          this.context.router.push('/success');
        } else {
          console.log(err);
          alert('Oops, there was an error signing you up');
        }
      });
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
