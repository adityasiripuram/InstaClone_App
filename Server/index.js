const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./db");
require('dotenv').config();


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

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

app.listen(process.env.MONGOPORT, () => {
  console.log("Server is listening on", process.env.MONGOPORT);
});
