const Question = require("../model/Question");
const Quiz = require("../model/Quiz");

const checkClassroomOwnership = (req, res, next) => {
  if (
    req.user.classrooms.map((c) => c._id.toString()).includes(req.params.id)
  ) {
    return next();
  }
  res.status(403).json({ message: "Not authorized" });
};

const checkQuizOwnership = async (req, res, next) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId).populate("questions");
    const classroom = await quiz.classroom();
    if (classroom.quizzes.map((c) => c._id.toString()).includes(quizId)) {
      req.classroom = classroom;
      return next();
    }
    res.status(403).json({ message: "Not authorized" });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
  }
};

const checkQuestionOwnership = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);
    const quiz = await question.quiz();
    if (quiz.questions.map((c) => c._id.toString()).includes(questionId)) {
      return next();
    }
    res.status(403).json({ message: "Not authorized" });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
  }
};

const checkQuizFinished = async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  const currentDate = new Date();//offsetDate(new Date().getTime(), 2);
  if (quiz.date < currentDate) {
    return next();
  }
  res.status(400).json({ message: "Results not yet available" });
}

module.exports = {
  checkClassroomOwnership,
  checkQuizOwnership,
  checkQuestionOwnership,
  checkQuizFinished
};
