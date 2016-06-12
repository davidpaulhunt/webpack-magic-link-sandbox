import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';

class ApplicationContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    me: PropTypes.object,
  };

  get content() {
    return (
      <Router
        routes={this.props.routes}
        history={this.props.history}
      />
    );
  }

  render() {
    return (
      <div id="app">
        {this.content}
      </div>
    );
  }
}

export default ApplicationContainer;
