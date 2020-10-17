const mongoose = require("mongoose");
const { getBodyWithOffsetDate, offsetDate } = require("../common/util");
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

quizSchema.methods.getStudentById = async function (id) {
  const Student = this.model('Student');
  const student = await Student.findById(id);
  const studentEntry = this.students.find(s => s.id === id);
  return { email: student.email, code: studentEntry.code };
};

quizSchema.methods.checkIfEnrolled = async function (id, value) {
  if (this.students.map(s => s.id).includes(id) === value) {
    return;
  }
  throw new Error();
};

quizSchema.methods.generateCode = async function(id, code) {
  const studentEntry = this.students.find(s => s.id === id);
  studentEntry.code = code;
  await this.save();
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
  if (Object.keys(newQuiz).includes("date")) {
    newQuiz = getBodyWithOffsetDate(newQuiz, 2);
  }
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

quizSchema.methods.getProgressStatus = function () {
  const currentDate = offsetDate(new Date().getTime(), 2);
  const quizEndDate = new Date((this.date).getTime() + this.duration * 60000);
  // console.log(currentDate);
  // console.log(this.date);
  // console.log(quizEndDate);
  if (currentDate < this.date) return -1;
  if (currentDate > quizEndDate) return 1;
  return 0;
};

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
