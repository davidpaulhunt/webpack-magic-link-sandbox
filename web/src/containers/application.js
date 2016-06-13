import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ApplicationContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.object,
    me: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    isAuthenticating: PropTypes.bool,
    auth: PropTypes.object,
    dispatch: PropTypes.func,
  };

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        user: this.props.user,
        me: this.props.user,
        isAuthenticated: this.props.isAuthenticated,
        isAuthenticating: this.props.isAuthenticating,
      }));
    return (
      <div id="app">
        {childrenWithProps}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  me: state.me,
  user: state.me.user,
  isAuthenticating: state.me.isAuthenticating,
  isAuthenticated: state.me.isAuthenticated,
});

module.exports = connect(mapStateToProps)(ApplicationContainer);
