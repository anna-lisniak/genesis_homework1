const express = require('express');
const router = express.Router();
const savePersonToPublicFolder = require('../controlers/user/create');
const { findUser } = require('../controlers/user/utils');

router.post('/create', (req, res, next) => {
  const { body: { email, password } } = req;
  if (!email || !password) {
    res.status(404).send("You should provide email and password");
    return;
  }

  if (!findUser(email)) {
    res.status(404).send('User with this email already exist');
    return;
  }

  savePersonToPublicFolder({ email, password }, (err) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }

    setToken(email, password, res);
  });
});

router.post("/login", (req, res, next) => {
  const { body: { email, password } } = req;

  const userPassword = findUser(email);
  if (!userPassword) {
    res.status(404).send("User with this email is not found");
    return;
  }

  if (userPassword !== password) {
    res.status(400).send("Invalid password")
    return;
  }

  setToken(email, password, res);
})

module.exports = router;
