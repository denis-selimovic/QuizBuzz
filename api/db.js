const mongoose = require('mongoose');
const { getDatabaseUri } = require('./common/config');

mongoose.connect(process.env.MONGODB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

module.exports = mongoose.connection;
