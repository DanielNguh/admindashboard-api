const express = require("express");
const bodyParser = require("body-parser");

const Logs = require("../models/log");

const logRouter = express.Router();

logRouter.use(bodyParser.json());

logRouter
  .route("/")
  .get((req, res, next) => {
    Logs.find(req.query)
      .then(
        (logs) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(logs);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Logs.create(req.body)
      .then(
        (log) => {
          console.log("Log created", log);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(log);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /logs");
  })
  .delete((req, res, next) => {
    Logs.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  });

module.exports = logRouter;
