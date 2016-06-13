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

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: null,
  error: null,
};

function meLoader(state = initialState, action) {
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

export default meLoader;
