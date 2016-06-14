import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signout } from '../redux/modules/me';

const navLink = (path, text, onClickHandler = f => f) => (
  <Link to={`/${path}`} className="nav-link" onClick={onClickHandler}>{text}</Link>
);

class ApplicationContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.object,
    me: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    isAuthenticating: PropTypes.bool,
    isSigningOut: PropTypes.bool,
    auth: PropTypes.object,
    dispatch: PropTypes.func,
  };

  handleSignout = (e) => {
    e.preventDefault();
    this.props.dispatch(signout());
  }

  renderAuthenticatedNav() {
    return (
      <div className="app-nav">
        {navLink('dashboard', 'Dashboard')}
        {navLink('signout', 'Signout', this.handleSignout)}
      </div>
    );
  }

  renderUnauthenticatedNav() {
    return (
      <div className="app-nav">
        {navLink('signin', 'Signin')}
      </div>
    );
  }

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
        {
          this.props.isAuthenticated ?
            this.renderAuthenticatedNav() : this.renderUnauthenticatedNav()
        }
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
  isSigningOut: state.me.isSigningOut,
});

module.exports = connect(mapStateToProps)(ApplicationContainer);
