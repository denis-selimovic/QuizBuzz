const express = require("express");
const router = express.Router();
const { auth } = require("../common/auth");
const { validateBody } = require("../common/http");
const { checkClassroomOwnership } = require("../common/validations");

const Quiz = require("../model/Quiz");
const Classroom = require("../model/Classroom");

router.post("/create", auth, validateBody(["name"]), async (req, res) => {
  const code = req.body.name.concat("-", Classroom.generateRandomId());
  const classroom = new Classroom({ code });
  await classroom.save();
  await req.user.addClassroom(classroom);
  res.status(201).json(classroom);
});

router.delete("/:id", auth, checkClassroomOwnership, async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    await classroom.remove();
    res.status(200).json({ message: "Classroom successfully deleted" });
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
});

router.post(
  "/:id/quiz",
  auth,
  checkClassroomOwnership,
  validateBody(["name", "date", "duration"]),
  async (req, res) => {
    try {
      const classroom = await Classroom.getClassroomByIdAndPopulate(
        req.params.id,
        "quizzes"
      );
      const quiz = new Quiz(req.body);
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
//možda promijeniti rutu?
router.get("/:id/quizzes", auth, checkClassroomOwnership, async (req, res) => {
  try {
    const classroom = await Classroom.getClassroomByIdAndPopulate(
      req.params.id,
      { path: "quizzes", populate: { path: "questions", model: "Question" } }
    );

    res.status(200).json(classroom.quizzes);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Unable to load item" });
  }
});

module.exports = router;
