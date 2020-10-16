const express = require("express");
const router = express.Router();
const { auth } = require("../common/auth");
const { validateBody } = require("../common/http");

const Question = require("../model/Question");
const Quiz = require("../model/Quiz");

//sve ove rute ce dobit auth kasnije
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.getQuizByIdPopulated(req.params.id);
    res.status(200).json(quiz);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Could not load item" });
  }
});

router.post(
  "/:id/question",
  validateBody(["text", "points", "scoringSystem"]),
  async (req, res) => {
    try {
      const quiz = Quiz.getQuizByIdPopulated(req.params.id);

      //provjeriti da li je ovaj user owner ovog kviza

      const question = new Question(req.body);
      question.save();
      quiz.questions.push(question);
      quiz.save();
      res.status(201).json(quiz); //da li vratiti cijeli kviz ovdje
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Could not load item" });
    }
  }
);

router.delete("/:id", async (req, res) => {});

module.exports = router;
