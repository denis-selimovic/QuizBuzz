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
        of: {
          key: {
              type: String,
              required: true
          },
          points: [{
              amount: {
                  type: Number,
                  required: true
              },
              questionId: {
                  type: String,
                  required: true
              }
          }]
        },
        default: {}
    },
    questions: [{
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }],
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
