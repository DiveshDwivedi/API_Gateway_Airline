const express = require("express");
const rateLimit = require("express-rate-limit");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 100, // Limit each IP to 3 requests per `window` (here, per 2 minutes)
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// proxy setup
app.use(
  "/flightsService/",
  createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/flightsService": "/" },
  })
);
app.use(
  "/bookingService/",
  createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/bookingService": "/" },
  })
);
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
