import httpProxy from 'http-proxy';

export default (uri) => {
  const proxy = httpProxy.createProxyServer({
    target: uri,
    prependPath: false,
    xfwd: true,
    changeOrigin: true,
  });
  proxy.on('proxyReq', (proxyReq, req) => {
    if (req.authentication && req.authentication.token) {
      proxyReq.setHeader('Authorization', `Bearer ${req.authentication.token}`);
    }
  });

  return function apiProxy(req, res) {
    proxy.web(req, res);
  };
};
