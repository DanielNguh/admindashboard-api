const express = require("express");
const bodyParser = require("body-parser");

const Resources = require("../models/resource");

const resourceRouter = express.Router();

resourceRouter.use(bodyParser.json());

resourceRouter
  .route("/")
  .get((req, res, next) => {
    Resources.find(req.query)
      .then(
        (resources) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resources);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Resources.create(req.body)
      .then(
        (resource) => {
          console.log("Resource created", resource);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resource);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /resources");
  })
  .delete((req, res, next) => {
    Resources.deleteMany({})
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

module.exports = resourceRouter;
