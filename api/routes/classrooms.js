const express = require("express");
const router = express.Router();
const { auth } = require("../common/auth");
const { validateBody } = require("../common/http");

const Quiz = require("../model/Quiz");
const Classroom = require("../model/Classroom");

router.post(
  "/:id/quiz",
  // auth,
  validateBody(["name", "date", "duration"]),
  async (req, res) => {
    try {
      const classroom = await Classroom.getClassroomByIdAndPopulate(
        req.params.id,
        "quizzes"
      );

      //req.user.checkIfOwnsClassroom(classroom._id);
      const quiz = new Quiz({ ...req.body, questions: [], students: {} });
      await quiz.save();
      classroom.quizzes.push(quiz);
      await classroom.save();
      res.status(201).json(quiz);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Unable to load item" });
    }
  }
);

//get all quizes for classroom
router.get("/:id/quizzes", async (req, res) => {
  try {
    const classroom = await Classroom.getClassroomByIdAndPopulate(
      req.params.id,
      { path: "quizzes", populate: { path: "questions", model: "Question" } }
    );

    //req.user.checkIfOwnsClassroom(classroom._id);
    res.status(200).json(classroom.quizzes);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Unable to load item" });
  }
});

module.exports = router;
