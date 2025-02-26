const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./db");

// Connect to MongoDB
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongo error", err);
});

// Require your models
require("./models/user");
require("./models/post");

// Middlewares and routes
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

// If running locally, you might still want to listen on a port:
if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.MONGOPORT, () => {
    console.log("Server is listening on", process.env.MONGOPORT);
  });
}

// For Vercel, wrap your app as a serverless function:
const serverless = require("serverless-http");
module.exports = app;
module.exports.handler = serverless(app);
