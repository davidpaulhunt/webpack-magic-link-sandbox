import request from 'superagent';

export const VALIDATING_TOKEN = 'VALIDATING_TOKEN';
function requestTokenValidation() {
  return { type: VALIDATING_TOKEN };
}

export const TOKEN_VALIDATION_RECEIVED = 'TOKEN_VALIDATION_RECEIVED';
function receiveTokenValidation(response) {
  return { type: TOKEN_VALIDATION_RECEIVED, response };
}

function tokenValidation(state = {
  isValidToken: false, isValidatingToken: true,
}, action) {
  switch (action.type) {
    case VALIDATING_TOKEN:
      return Object.assign({}, state, {
        isValidatingToken: true,
      });
    case TOKEN_VALIDATION_RECEIVED:
      return Object.assign({}, state, {
        isValidatingToken: false,
        isValidToken: action.response.statusCode === 200,
      });
    default:
      return state;
  }
}

export function validateToken(uid, token) {
  return (dispatch) => {
    dispatch(requestTokenValidation(uid, token));

    return Promise.resolve(
      request.post('/api/auth/validate_token')
        .send({ uid, token })
        .set('Accept', 'application/json')
    )
    .then(response => dispatch(receiveTokenValidation(response)));
  };
}

export default tokenValidation;
