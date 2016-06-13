const common = require('../common');
const Checkit = require('checkit');
const Promise = require('bluebird');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const appSecret = common.config.app_secret;

const User = common.bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize() {
    this.on('saving', this.validate);
    this.on('creating', this.setTokens);
  },

  validations: {
    username: ['required', 'string'],
    email: ['required', 'email', function uniquenessOfEmail(val) {
      return common.knex('users')
        .where('email', val)
        .andWhere('id', '<>', this.target.id)
        .first()
        .then(record => {
          if (record) {
            throw new Error('Email is already in use');
          }
        });
    }],
  },

  validate() {
    return new Checkit(this.validations).run(this.attributes);
  },

  serialize() {
    return {
      id: this.get('id'),
      email: this.get('email'),
      username: this.get('username'),
    };
  },

  setTokens() {
    const tokenSecret = User.generateTokenSecret();
    const cachedMagicToken = uuid.v4();
    const magicToken = bcrypt.hashSync(cachedMagicToken, 10);

    this.set({
      uid: uuid.v4(),
      token_secret: tokenSecret,
      magic_token: magicToken,
    });
  },

  sendMagicLink() {
    const mailLink = (uid, token) => {
      const url = `${common.config.app_host}/go/${uid}/${token}`;
      console.log(url);
      return Promise.resolve(this);
    };
    if (this.cachedMagicToken) {
      return mailLink(this.get('uid'), this.cachedMagicToken);
    }

    this.cachedMagicToken = uuid.v4();
    const magicToken = bcrypt.hashSync(this.cachedMagicToken, 10);
    return this.save({ magic_token: magicToken }, { patch: true })
      .tap(() => mailLink(this.get('uid'), this.cachedMagicToken));
  },

  generateJWT() {
    const decodedTokenSecret = this.decodeTokenSecret();
    const token = jwt.sign(this.toJSON(), decodedTokenSecret);
    return token;
  },

  decodeTokenSecret() {
    const tokenSecret = this.get('token_secret');
    return appSecret + tokenSecret;
  },
}, {
  generateTokenSecret(token) {
    return crypto.createHash('sha512').update(token || uuid.v4(), 'utf8').digest('hex');
  },

  create(params) {
    const email = params.email;
    const username = params.username;

    return User.forge({ email, username })
      .save()
      .then(user => user.sendMagicLink());
  },

  signin(params) {
    const email = params.email;
    if (!email) {
      throw new Error('Missing param: email');
    }

    return User.forge({ email })
      .fetch()
      .then(user => {
        if (user) {
          return user.sendMagicLink();
        }

        return Promise.resolve(true);
      });
  },
});

module.exports = User;
