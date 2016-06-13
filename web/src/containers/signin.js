import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Form from '../components/form';
import FormInput from '../components/form_input';
import request from 'superagent';

export default class SigninContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('[name="email"]').value;

    request.post('/api/auth/signin')
      .send({ email })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (res.statusCode === 200) {
          this.context.router.push('/success');
        } else {
          alert('Oops, there was an error, try again.');
        }
      });
  }

  render() {
    return (
      <div id="sigin-wrapper">
        <Form
          name="signin"
          handleSubmit={this.handleSubmit}
        >
          <FormInput
            name="email"
            type="email"
            placeholder="you@areawesome.com"
          />
        </Form>
        <p>Signed in? Go to <Link to="/dashboard">dashboard</Link>.</p>
        <p>Don't have an account? Sign up <Link to="/signup">here</Link>.</p>
      </div>
    );
  }
}
