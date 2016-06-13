/* eslint-disable no-param-reassign */

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import apiProxy from './middleware/proxy';
import request from 'superagent';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/html';

const app = express();
const formParser = bodyParser.urlencoded({ extended: false });

app.use(formParser);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'build'))); // Use the build folder first.
app.use(express.static(path.join(__dirname, 'public'))); // Fallback to public.
app.use((req, res, next) => {
  const uid = req.cookies.gouid;
  const token = req.cookies[`gokey-${uid}`];
  req.authentication = {};
  if (token) {
    req.authentication.token = token;
  }
  req.authentication.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  next();
});

app.use('/api', apiProxy('http://127.0.0.1:4001'));

app.post('/go/:uid/:token', (req, res) => {
  request.post('http://127.0.0.1:4001/auth/redeem')
    .send({
      uid: req.params.uid,
      token: req.params.token,
    })
    .set('Accept', 'application/json')
    .end((err, authRes) => {
      if (err || !authRes.ok) {
        res.redirect('/');
      } else {
        res.cookie('gouid', authRes.body.user.id);
        res.cookie(`gokey-${authRes.body.user.id}`, authRes.body.jwt);
        res.redirect('/');
      }
    });
});

app.use((req, res) => {
  res.send(`
    <!doctype html>
    ${ReactDOM.renderToString(<Html />)}
  `);
});

app.listen(4000, () => {
  process.stdout.write('\nNow running on port 4000\n');
});
