import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import request from 'superagent';

class ApplicationContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.object,
    me: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
    };
  }

  componentDidMount() {
    if (!this.state.isAuthenticated) {
      request.get('/api/me')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res.statusCode === 200) {
            this.setState({
              isAuthenticated: true,
              user: res.body,
            });
          }
        });
    }
  }

  get content() {
    return (
      React.Children.map(this.props.children, (child) =>
        React.cloneElement(child, {
          user: this.state.user,
          me: this.state.user,
          isAuthenticated: this.state.isAuthenticated,
        }))
    );
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        user: this.state.user,
        me: this.state.user,
        isAuthenticated: this.state.isAuthenticated,
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
  user: state.user,
  isAuthenticated: state.isAuthenticated,
});

module.exports = connect(mapStateToProps)(ApplicationContainer);
