import React, { Component } from 'react';
import { Link } from 'react-router';

export default class HomeContainer extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <p>This is home. Sign in <Link to="/signin">here</Link>.</p>
      </div>
    );
  }
}
