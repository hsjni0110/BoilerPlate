const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://youtube-clone-server.run.goorm.io',
            changeOrigin: true,
        })
    );
};