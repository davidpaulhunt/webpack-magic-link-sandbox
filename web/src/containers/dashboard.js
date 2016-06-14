import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Form from '../components/form';
import FormInput from '../components/form_input';
import { Button, Modal } from 'react-bootstrap';
import { editAccount, updateUser, cancelAccountUpdate } from '../redux/modules/dashboard';
import serializer from '../helpers/form_serializer';

class DashboardContainer extends Component {
  static propTypes = {
    me: PropTypes.object,
    dispatch: PropTypes.func,
    dashboard: PropTypes.object,
  };

  editAccount = () => {
    this.props.dispatch(editAccount());
  }

  stopEditAccount = () => {
    this.props.dispatch(cancelAccountUpdate());
  }

  updateAccount = (event) => {
    event.preventDefault();
    const form = event.target;
    const params = serializer(form);
    this.props.dispatch(updateUser(params));
  }

  render() {
    return (
      <div className="dashboard-wrapper">
        <p className="greeting">Hello, {this.props.me.user.username}!</p>
        <div className="dashboard-actions">
          <div>
            <Button onClick={this.editAccount}>Edit Account</Button>
            <Modal show={this.props.dashboard.isUpdatingAccount} onHide={this.stopEditAccount}>
              <Modal.Header closeButton><Modal.Title>Edit Account</Modal.Title></Modal.Header>
              <Modal.Body>
                {
                  this.props.dashboard.error ?
                    (<p>{this.props.dashboard.error.message}</p>) : null
                }
                <Form name="edit-account" handleSubmit={this.updateAccount}>
                  <FormInput
                    name="username"
                    type="text"
                    placeholder={this.props.me.user.username}
                  />
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
  //
  // handleButtonClick = (e) => {
  //   const typeOfEvent = e.target.name;
  //   switch (typeOfEvent) {
  //     case 'edit_account':
  //       this.props.dispatch(editAccount());
  //       break;
  //     default:
  //   }
  // }
  //
  // handleAccountUpdateSubmit = (e) => {
  //   const form = e.target;
  //   const params = serializer(form);
  //   this.props.dispatch(updateAccount(params));
  // }
  //
  // handleModalClose = () => {
  //   this.props.dispatch(cancelAccountUpdate());
  // }
  //
  // renderActionButton(options) {
  //   return (
  //     <Button
  //       name={options.name}
  //       onClick={this.handleButtonClick}
  //       bsStyle={options.style || 'default'}
  //     >{options.text}</Button>
  //   );
  // }
  //
  // renderActionModal() {
  //   return (
  //     <Modal
  //       show={
  //         this.props.dashboard.isUpdatingAccount && this.props.dashboard.openModal
  //       }
  //       onHide={this.handleModalClose}
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title>Update Account</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form
  //           name="account-update"
  //           handleSubmit={this.handleAccountUpdateSubmit}
  //         >
  //           <FormInput
  //             name="username"
  //             type="text"
  //             placeholder={this.props.me.username}
  //           />
  //         </Form>
  //       </Modal.Body>
  //     </Modal>
  //   );
  // }
  //
  // renderDashboardAction(button, modal = null) {
  //   return (
  //     <div className="dashboard-action">
  //       {this.renderActionButton(button)}
  //       {modal ? this.renderActionModal(modal) : null}
  //     </div>
  //   );
  // }
  //
  // renderUpdateForm() {
  //   return (
  //     <Modal show>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Title</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form
  //           name="account-update"
  //           handleSubmit={this.handleAccountUpdateSubmit}
  //         >
  //           <FormInput
  //             name="username"
  //             type="text"
  //             placeholder={this.props.me.username}
  //           />
  //         </Form>
  //       </Modal.Body>
  //     </Modal>
  //   );
  // }
  //
  // render() {
  //   return (
  //     <div id="dashboard-wrapper">
  //       <p>Hello, {this.props.me.username}</p>
  //       <div className="dashboard-actions">
  //         <div className="dashboard-action">
  //           {this.renderDashboardAction({
  //             name: 'edit_account',
  //             text: 'Edit Account',
  //           }, true)}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps)(DashboardContainer);
