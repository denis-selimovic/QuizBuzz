const jwt = require('jsonwebtoken');
const User = require('../model/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = await jwt.verify(token, 'thisisasecrettoken');
        const user = await User.findOne({ _id: decoded._id }).populate('classrooms');
        if (!user) {
            return res.status(401).json({ message: 'Could not authenticate user' });
        }
        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Could not authenticate user' });
    }
};

module.exports = {
    auth
}
