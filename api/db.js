const mongoose = require('mongoose');

// moraš da instaliraš mongo na linuxu
// pokreneš mongo proces prije pokretanja node
// baza quiz-api-db će se sama kreirati

mongoose.connect('mongodb://localhost/quiz-api-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

module.exports = mongoose.connection;
