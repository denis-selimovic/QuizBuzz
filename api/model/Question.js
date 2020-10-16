const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  answers: [
    {
      content: {
        type: String,
        required: true,
        trim: true,
      },
      correct: {
        type: Boolean,
        required: true,
      },
    },
  ],
  points: {
    type: Number,
    required: true,
  },
  scoringSystem: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
});

questionSchema.methods.quiz = async function () {
  const Quiz = this.model("Quiz");
  return await Quiz.findOne({
    questions: { $elemMatch: { $eq: { _id: this._id } } },
  }).exec();
};

questionSchema.pre("remove", async function (next) {
  const quiz = await this.quiz();
  quiz.questions.remove(this);
  await quiz.save();
  next();
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
