const mongoose = require("mongoose");
const Classroom = require("./Classroom");
const Question = require("./Question");
const { Schema } = mongoose;

const quizSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  students: {
    type: Map,
    of: {
      key: {
        type: String,
        required: true,
      },
      points: [
        {
          amount: {
            type: Number,
            required: true,
          },
          questionId: {
            type: String,
            required: true,
          },
        },
      ],
    },
    default: {},
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

quizSchema.statics.getQuizByIdPopulated = async (id) => {
  const quiz = await Quiz.findById(id).populate("questions");
  if (!quiz) {
    throw new Error();
  }

  return quiz;
};

quizSchema.methods.classroom = async function () {
  const Classroom = this.model("Classroom");
  return await Classroom.findOne({
    quizzes: { $elemMatch: { $eq: { _id: this._id } } },
  }).exec();
};

quizSchema.pre("remove", async function (next) {
  const classroom = await this.classroom();
  classroom.quizzes.remove(this);
  await classroom.save();

  this.questions.forEach(async (question) => {
    await question.remove();
  });
  next();
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
