const mongoose = require('mongoose');
const { getDatabaseUri } = require('./common/config');

mongoose.connect(getDatabaseUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).catch(err => console.log(err));

module.exports = mongoose.connection;
