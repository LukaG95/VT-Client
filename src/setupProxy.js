const { createProxyMiddleware } = require("http-proxy-middleware");


module.exports = function(app) {
    app.use('/auth', createProxyMiddleware({ target: 'https://justlearningfront.website/', changeOrigin: true }));
    app.use('/auth', createProxyMiddleware({ target: 'https://justlearningfront.website/', changeOrigin: true }));
    app.use('/trades', createProxyMiddleware({ target: 'https://justlearningfront.website/', changeOrigin: true }));
};