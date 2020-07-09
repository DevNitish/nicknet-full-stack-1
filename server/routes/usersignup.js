const express = require("express");
const router =express.Router();
const User = require("../model/user");

router.post("/signup", async (req, res) => {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    await User.findOne({ name: newUser.name })
    .then(async profile => {
      if (!profile) {
    await newUser
      .save()
      .then(() => {
        res.status(200).send(newUser);
      })
      .catch(err => {
        console.log("Error is ", err.message);
      });
    } else {
        res.send("User already exists...");
      }
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
  });

  module.exports = router;