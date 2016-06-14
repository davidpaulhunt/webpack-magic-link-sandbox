import request from 'superagent';

export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';
export function editAccount() {
  return { type: EDIT_ACCOUNT };
}
export const CANCEL_ACCOUNT_UPDATE = 'CANCEL_ACCOUNT_UPDATE';
export function cancelAccountUpdate() {
  return { type: CANCEL_ACCOUNT_UPDATE };
}
const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export function updateAccount(params) {
  return { type: UPDATE_ACCOUNT, params };
}
export const ACCOUNT_UPDATED = 'ACCOUNT_UPDATED';
function accountUpdated(user) {
  return { type: ACCOUNT_UPDATED, user };
}
export const ACCOUNT_UPDATE_FAILED = 'ACCOUNT_UPDATE_FAILED';
function accountUpdateFailed(error) {
  return { type: ACCOUNT_UPDATE_FAILED, error };
}

const initialState = {
  openModal: false,
  isUpdatingAccount: false,
  error: null,
};

function dashboardActions(state = initialState, action) {
  switch (action.type) {
    case EDIT_ACCOUNT:
      return {
        ...state,
        isUpdatingAccount: true,
        openModal: true,
      };
    case CANCEL_ACCOUNT_UPDATE:
      return {
        ...state,
        isUpdatingAccount: false,
      };
    case UPDATE_ACCOUNT:
      return {
        ...state,
        isUpdatingAccount: true,
        openModal: true,
      };
    case ACCOUNT_UPDATED:
      return {
        ...state,
        isUpdatingAccount: false,
        openModal: false,
      };
    case ACCOUNT_UPDATE_FAILED:
      return {
        ...state,
        isUpdatingAccount: true,
        openModal: true,
        error: action.error,
      };
    default:
      return state;
  }
}

export function updateUser(params = {}) {
  return (dispatch) => {
    dispatch(updateAccount());
    return Promise.resolve(
      request.put('/api/me')
        .send({ user: params })
        .set('Accept', 'application/json')
    )
    .then(response => {
      console.log('hello', response);
      dispatch(accountUpdated(response.body.user));
    })
    .catch(error => dispatch(accountUpdateFailed(error)));
  };
}

export default dashboardActions;
