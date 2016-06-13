import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class HomeContainer extends Component {
  static propTypes = {
    me: PropTypes.object,
    dispatch: PropTypes.func,
  }

  render() {
    return (
      <div className="home-wrapper">
        <p>This is home. Sign in <Link to="/signin">here</Link>.</p>
      </div>
    );
  }
}

export default connect()(HomeContainer);
