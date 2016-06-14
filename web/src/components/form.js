import React, { Component, PropTypes } from 'react';
import { Button, FormGroup, ControlLabel } from 'react-bootstrap';

export default class FormComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  };

  renderChildren() {
    return React.Children.map(this.props.children, (child) =>
      (
      <FormGroup>
        <ControlLabel>{child.props.name}</ControlLabel>
        {child}
      </FormGroup>
      )
    );
  }

  render() {
    return (
      <div id={`${this.props.name}-form`}>
        <form onSubmit={this.props.handleSubmit}>
          {this.renderChildren()}
          <FormGroup>
            <Button type="submit" bsStyle="primary">Submit</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}
