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

module.exports = router;
