const express = require("express");
const router = express.Router();
const { auth } = require("../common/auth");
const { validateBody, partiallyValidateBody } = require("../common/http");
const { checkQuizOwnership } = require("../common/validations");

const Question = require("../model/Question");
const Quiz = require("../model/Quiz");

router.get("/:id", auth, checkQuizOwnership, async (req, res) => {
  try {
    const quiz = await Quiz.getQuizByIdPopulated(req.params.id);
    res.status(200).json(quiz);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Could not load item" });
  }
});

router.delete("/:id", auth, checkQuizOwnership, async (req, res) => {
  try {
    const quiz = await Quiz.getQuizByIdPopulated(req.params.id);

    await quiz.remove();
    res.status(200).json({ message: "Item successfully deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Could not load item" });
  }
});

router.post(
  "/:id/question", auth, checkQuizOwnership, validateBody(["text", "points", "scoringSystem"]), async (req, res) => {
    try {
      const quiz = await Quiz.getQuizByIdPopulated(req.params.id);

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

router.patch("/:id", auth, checkQuizOwnership,
  partiallyValidateBody(["name", "date", "duration"]), async (req, res) => {
    try {
      const quiz = await Quiz.updateQuizById(req.params.id, req.body);
      res.status(200).json(quiz);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Could not load item" });
    }
  })

module.exports = router;
