import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { validateToken } from '../redux/modules/auth';
import { connect } from 'react-redux';

class TokenContainer extends Component {
  static propTypes = {
    auth: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    const { uid, token } = this.props.params;
    this.props.dispatch(validateToken(uid, token));
  }

  tokenValidationResponse() {
    if (this.props.auth.isValidToken) { // eslint-disable-line
      return (
        this.renderValidToken()
      );
    }
    return (
      this.renderInvalidToken()
    );
  }

  renderValidating() {
    return (
      <div id="token-wrapper">
        Checking token...
      </div>
    );
  }

  renderValidToken() {
    return (
      <div>
        <h1>Success!</h1>
        <p>You're ready to go.</p>
        <form method="post">
          <input type="hidden" />
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }

  renderInvalidToken() {
    return (
      <div>
        <h1>Link Expired</h1>
        <p>
          Oh, no... it looks like this link has already been used or has expired.
           Please login again.
        </p>
        <Link to="/signin">Sign in</Link>
      </div>
    );
  }

  render() {
    return (
      <div id="token-wrapper">
        {
          this.props.auth.isValidatingToken ? // eslint-disable-line
            this.renderValidating() :
            this.props.auth.isValidToken ?
              this.renderValidToken() :
              this.renderInvalidToken()
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(TokenContainer);
