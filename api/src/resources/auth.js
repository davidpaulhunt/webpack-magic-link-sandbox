const express = require('express');
const router = express.Router(); // eslint-disable-line
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const validateParams = require('../middleware/validate_params');
const User = require('../models/user');

router.use(bodyParser.json());

router.post('/signin',
  validateParams({
    email: ['required', 'email'],
  }), (req, res) => {
    User.signin(req.params)
      .then(user => res.json(user.toJSON()))
      .catch(() => res.status(400).json('Unable to find user'));
  });

router.post('/signup',
  validateParams({
    email: ['required', 'email'],
    username: ['required', 'string'],
  }), (req, res) => {
    User.create(req.params)
      .then(user => res.json(user.toJSON()))
      .catch(() => res.status(400).json('Unable to create account'));
  });

router.post('/validate_token',
  validateParams({
    uid: ['required', 'string'],
    token: ['required', 'string'],
  }), (req, res) => {
    User.forge({ uid: req.params.uid })
      .fetch()
      .then(user => {
        bcrypt.compare(req.params.token, user.get('magic_token'), (err, bRes) => {
          if (bRes) {
            res.json({ jwt: null, user: user.toJSON() });
          } else {
            res.status(400).json('Invalid token');
          }
        });
      });
  });

router.post('/redeem',
  validateParams({
    uid: ['required', 'string'],
    token: ['required', 'string'],
  }), (req, res) => {
    User.forge({ uid: req.params.uid })
      .fetch()
      .then(user => {
        bcrypt.compare(req.params.token, user.get('magic_token'), (err, bRes) => {
          if (bRes) {
            const jwt = user.generateJWT();

            user.save({ magic_token: null }, { patch: true })
              .then(u => res.json({ jwt, user: u }))
              .catch(() => res.status(400).json({ error: 'error' }));
          } else {
            res.status(400).json('Invalid token');
          }
        });
      });
  });

module.exports = router;
