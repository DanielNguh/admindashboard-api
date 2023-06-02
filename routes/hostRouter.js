const express = require("express");
const bodyParser = require("body-parser");

const Hosts = require("../models/host");

const hostRouter = express.Router();

hostRouter.use(bodyParser.json());

hostRouter
  .route("/")
  .get((req, res, next) => {
    Hosts.find(req.query)
      .then(
        (hosts) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(hosts);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Hosts.create(req.body)
      .then(
        (host) => {
          console.log("Host created", host);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(host);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /hosts");
  })
  .delete((req, res, next) => {
    Hosts.deleteMany({})
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

module.exports = hostRouter;
