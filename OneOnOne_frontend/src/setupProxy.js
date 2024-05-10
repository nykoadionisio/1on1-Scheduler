const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Change this to match your Django server URL
      changeOrigin: true,
    })
  );
};
