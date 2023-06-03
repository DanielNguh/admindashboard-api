const express = require("express");
const bodyParser = require("body-parser");

const WhatsappMessages = require("../models/whatsapp_message");

const whatsappRouter = express.Router();

whatsappRouter.use(bodyParser.json());

whatsappRouter
  .route("/")
  .get((req, res, next) => {
    WhatsappMessages.find(req.query)
      .then(
        (whatsapp_messages) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(whatsapp_messages);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    WhatsappMessages.create(req.body)
      .then(
        (whatsapp_message) => {
          console.log("Whatsapp Message created", whatsapp_message);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(whatsapp_message);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /whatsapp");
  })
  .delete((req, res, next) => {
    WhatsappMessages.deleteMany({})
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

module.exports = whatsappRouter;
