const express = require("express");
const router = express.Router();
const { auth } = require("../common/auth");
const { validateBody } = require("../common/http");
const User = require('../model/User');

router.post('/register', validateBody(['username', 'password', 'name', 'surname', 'email']), async (req, res) => {
    const emailOrPasswordMatching = await User.checkForDuplicate(req.body.username, req.body.email);
    if (emailOrPasswordMatching) {
      return res.status(401).json({ message: 'Username or email already in use' });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

router.post('/login', validateBody(['username', 'password']), async (req, res) => {
    try {
      const user = await User.findByCredentials(req.body.username, req.body.password);
      const token = await user.generateJwt();
      res.status(200).json({ _id: user._id, username: user.username, name: user.name, surname: user.surname, email: user.email, token });
    } catch (e) {
      res.status(403).json({ message: e.message });
    }
});

router.get('/profile', auth, async (req, res) => {
    res.status(200).json(req.user)
});

module.exports = router;
