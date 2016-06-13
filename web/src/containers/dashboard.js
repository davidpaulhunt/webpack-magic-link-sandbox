import React, { Component, PropTypes } from 'react';

export default class DashboardContainer extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    me: PropTypes.object,
  };

  render() {
    return (
      <div id="dashboard-wrapper">
        <p>Hello, {this.props.me.username}</p>
      </div>
    );
  }
}
