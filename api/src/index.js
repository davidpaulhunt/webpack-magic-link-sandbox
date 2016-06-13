const express = require('express');
const common = require('./common');

const app = express();

app.locals.common = common;

app.use('/auth', require('./resources/auth'));
app.use('/me', require('./resources/me'));

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
