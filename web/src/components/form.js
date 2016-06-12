import React, { Component, PropTypes } from 'react';

export default class FormComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  };

  renderChildren() {
    return React.Children.map(this.props.children, (child) =>
      (
      <div>
        <label>{child.props.name}</label>
        {child}
      </div>
      )
    );
  }

  render() {
    return (
      <div id={`${this.props.name}-form`}>
        <form onSubmit={this.props.handleSubmit}>
          {this.renderChildren()}
          <div className="form-actions">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
