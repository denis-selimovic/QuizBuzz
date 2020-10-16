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
  students: [{
    id: {
      type: String,
      required: true
    },
    code: {
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
  }],
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

  const Question = this.model("Question");
  await Question.deleteMany({ _id: { $in: this.questions } });
  next();
});

quizSchema.statics.updateQuizById = async (id, newQuiz) => {
  const quiz = await Quiz.getQuizByIdPopulated(id);
  Object.keys(newQuiz).forEach((key) => (quiz[key] = newQuiz[key]));
  await quiz.save();
  return quiz;
};

quizSchema.statics.getByCodePopulated = async (myCode) => {
  const quiz = await Quiz.findOne({ "students.code": myCode }).populate("questions");
  if (!quiz) {
    throw new Error();
  }
  return quiz;
};

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
