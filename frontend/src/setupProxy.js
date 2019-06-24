const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    const wsProxy = proxy("/ws", {
        target: "ws://localhost:5000",
        changeOrigin: true,
        ws: true,
        secure: false,
    });
    app.use(proxy("/api", { target: "http://localhost:5000/" }));
    app.use(wsProxy);
};
