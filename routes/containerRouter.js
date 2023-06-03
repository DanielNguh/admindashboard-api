const express = require("express");
const bodyParser = require("body-parser");

const Containers = require("../models/container_info");

const containerRouter = express.Router();

containerRouter.use(bodyParser.json());

containerRouter
  .route("/")
  .get((req, res, next) => {
    Containers.find(req.query)
      .then(
        (containers) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(containers);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Containers.create(req.body)
      .then(
        (container) => {
          console.log("Container created", container);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(container);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /containers");
  })
  .delete((req, res, next) => {
    Containers.deleteMany({})
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

module.exports = containerRouter;
