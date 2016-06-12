import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class TokenContainer extends Component {
  static propTypes = {
    params: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isValidatingToken: true,
    };
  }

  componentDidMount() {
    const { uid, token } = this.props.params;
    setTimeout(() => {
      this.setState({ isValidatingToken: false, isValidToken: true });
    }, 2000);
  }

  get tokenValidationResponse() {
    if (this.state.isValidToken) {
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
        {this.state.isValidatingToken ? this.renderValidating() : this.tokenValidationResponse}
      </div>
    );
  }
}
