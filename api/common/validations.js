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
      return next();
    }
    res.status(403).json({ message: "Not authorized" });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  checkClassroomOwnership,
  checkQuizOwnership,
};
