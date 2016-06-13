const express = require('express');
const router = express.Router(); // eslint-disable-line
const bodyParser = require('body-parser');
const provides = require('../middleware/provider');
const auth = require('../middleware/jwt');

router.use(bodyParser.json());

router.get('/',
  auth,
  provides('user'),
  (req, res) => {
    res.json(req.me);
  });

module.exports = router;
