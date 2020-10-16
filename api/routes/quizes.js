const { compareSync } = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { auth } = require("../common/auth");
const { validateBody } = require("../common/http");

const Question = require("../model/Question");
const Quiz = require("../model/Quiz");

router.get("/:id", auth, async (req, res) => {
  try {
    const quiz = await Quiz.getQuizByIdPopulated(req.params.id);
    req.user.checkIfOwnsQuiz(quiz._id);
    res.status(200).json(quiz);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Could not load item" });
  }
});

router.post(
  "/:id/question",
  auth,
  validateBody(["text", "points", "scoringSystem"]),
  async (req, res) => {
    try {
      const quiz = await Quiz.getQuizByIdPopulated(req.params.id);
      req.user.checkIfOwnsQuiz(quiz._id);

      const question = new Question(req.body);
      await question.save();
      quiz.questions.push(question);
      await quiz.save();
      res.status(201).json(quiz);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Could not load item" });
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    const quiz = await Quiz.getQuizByIdPopulated(req.params.id);
    req.user.checkIfOwnsQuiz(quiz._id);

    await quiz.remove();
    res.status(200).json({ message: "Item successfully deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Could not load item" });
  }
});

module.exports = router;
