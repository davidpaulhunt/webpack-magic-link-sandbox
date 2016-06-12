import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SuccessContainer extends Component {
  render() {
    return (
      <div id="success-wrapper">
        <p>Awesome! You're all signed up.</p>
        <p>
          Click the link to signin. <Link to="/go/123/abc123">GO</Link>
        </p>
      </div>
    );
  }
}
