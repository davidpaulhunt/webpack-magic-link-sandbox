/* eslint-disable no-param-reassign */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/html';

const app = express();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'build'))); // Use the build folder first.
app.use(express.static(path.join(__dirname, 'public'))); // Fallback to public.

app.use((req, res, next) => {
  const uid = req.cookies.gouid;
  const token = req.cookies[`wt-${uid}`];
  req.authentication = {};
  if (token) {
    req.authentication.token = token;
  }
  req.authentication.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  next();
});

app.post('/go/:uid/:token', (req, res) => {
  res.cookie('gouid', req.params.uid);
  res.cookie(`wt-${req.params.uid}`, req.params.token);
  res.redirect('/');
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
