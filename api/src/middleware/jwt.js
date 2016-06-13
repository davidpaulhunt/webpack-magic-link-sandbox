const User = require('../models/user');
const expressJWT = require('express-jwt');

const getSecretFromReq = (req, payload, done) => {
  if (!payload) return done(new Error('invalid_token'));

  const userId = payload.id;

  if (!userId) return done(new Error('missing_secret'));

  return User.forge({
    id: userId,
  })
  .fetch()
  .then(user => {
    if (!user) return done(new Error('missing_secret'));

    req.me = user; // eslint-disable-line
    const secret = user.decodeTokenSecret();
    return done(null, secret);
  })
  .catch(err => done(err));
};

const jwt = expressJWT({
  secret: getSecretFromReq,
});

module.exports = jwt;
