const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("./config-deploy.json");

const app = express();

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );

  if (req.headers.origin) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const homeRouter = require('./modules/api/home/router');``
const gameRouter = require('./modules/api/game/router');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

mongoose.connect(config.mongoPath, err => {
  if (err) console.error(err);
  else console.log("Database connect successful");
});

app.use('/api/home', homeRouter);
app.use('/api/game', gameRouter);

const port = process.env.port || 9000;

app.listen(port, err => {
  if (err) console.log(err);
  console.log("Server started at port " + port);
});
