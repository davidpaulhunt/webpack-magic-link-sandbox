import React, { Component, PropTypes } from 'react';

export default class FormInput extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  };

  render() {
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        placeholder={this.props.placeholder}
      />
    );
  }
}
