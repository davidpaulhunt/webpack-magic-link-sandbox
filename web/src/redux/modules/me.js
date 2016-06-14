import request from 'superagent';

export const FETCHING = 'FETCHING_ME';
function fetchMe() {
  return { type: FETCHING };
}

export const FETCHED = 'FETCHED_ME';
function fetchedMe(user) {
  return { type: FETCHED, user };
}

export const ERRORED = 'FETCHED_ERROR';
function fetchedError(error) {
  return { type: ERRORED, error };
}

export const SIGNING_OUT = 'SIGNING_OUT';
function signMeOut() {
  return { type: SIGNING_OUT };
}

export const SIGNED_OUT = 'SIGNED_OUT';
function signedOut() {
  return { type: SIGNED_OUT };
}

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  isSigningOut: false,
  user: null,
  error: null,
};

function meActions(state = initialState, action) {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        isAuthenticating: true,
      };
    case FETCHED:
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        user: action.user,
      };
    case ERRORED:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        error: action.error,
      };
    case SIGNING_OUT:
      return {
        ...state,
        isSigningOut: true,
      };
    case SIGNED_OUT:
      return {
        ...state,
        isAuthenticated: false,
        isSigningOut: false,
        user: null,
      };
    default:
      return state;
  }
}

export function loadMe() {
  return (dispatch) => {
    dispatch(fetchMe());

    return Promise.resolve(
      request.get('/api/me')
        .set('Accept', 'application/json')
    )
    .then(response => dispatch(fetchedMe(response.body.user)))
    .catch(error => dispatch(fetchedError(error)));
  };
}

export function signout() {
  return (dispatch) => {
    dispatch(signMeOut());

    return Promise.resolve(
      request.get('/signout')
    )
    .then(() => dispatch(signedOut()));
  };
}

export default meActions;
