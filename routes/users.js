var express = require("express");
var passport = require("passport");
const bodyParser = require("body-parser");
var authenticate = require("../authenticate");

var User = require("../models/user");

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get("/", authenticate.verifyUser, function (req, res, next) {
  User.find({})
    .then(
      (users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      },
      (err) => next(err)
    )
    .catch((err) => {
      next(err);
    });
});

router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.email }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.email) user.email = req.body.email;
        if (req.body.fullName) user.fullName = req.body.fullName;

        user.save()
        .then((err, user) => {
          passport.authenticate("local")(req, res, () => {
            var token = authenticate.getToken({_id: req.user._id, name: req.user.fullName});
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true,token: token, status: "Registration Successful!" }); // Added token in response message
          });
        })
        .catch((err) => next(err));
      }
    }
  );
});

router.post("/login", passport.authenticate('local'),(req, res) => {
  var token = authenticate.getToken({_id: req.user._id, name: req.user.fullname}); // Added name to JWT
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  // res.json({success: true, token: token, status: 'You are successfully logged in!'});
  res.json({success: true, token: token, status: 'You are successfully logged in!'});

});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
})

module.exports = router;
