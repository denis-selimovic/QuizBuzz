const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    students: {
        type: Map,
        of: String,
        default: {}
    },
    questions: [{
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
