const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://virtrade-production.herokuapp.com",
      changeOrigin: true,
    })
  );
};
