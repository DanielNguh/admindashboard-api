const express = require("express");
const bodyParser = require("body-parser");

const Pods = require("../models/pod_info");

const podRouter = express.Router();

podRouter.use(bodyParser.json());

podRouter
  .route("/")
  .get((req, res, next) => {
    Pods.find(req.query)
      .then(
        (pods) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(pods);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Pods.create(req.body)
      .then(
        (pod) => {
          console.log("Pod created", pod);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(pod);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /pods");
  })
  .delete((req, res, next) => {
    Pods.deleteMany({})
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

module.exports = podRouter;
