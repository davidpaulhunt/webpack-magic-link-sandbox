import React from 'react';

export default class Html extends React.Component {
  render() {
    return (
      <html lang="en-us">
        <head>
          <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="stylesheet" href="/css/main.css" media="screen" charSet="utf-8" />
          <script src="/js/vendor.bundle.js" charSet="utf-8"></script>
        </head>
        <body>
          <div id="root" />
          <script src="/js/bundle.js" charSet="utf-8"></script>
        </body>
      </html>
    )
  }
}
