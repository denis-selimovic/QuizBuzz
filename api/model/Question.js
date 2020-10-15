const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    answers: [{
        content: {
            type: String,
            required: true,
            trim: true
        },
        correct: {
            type: Boolean,
            required: true
        }
    }],
    points: {
        type: Number,
        required: true
    },
    scoringSystem: {
        type: Number,
        required: true,
        min: 0,
        max: 2
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
