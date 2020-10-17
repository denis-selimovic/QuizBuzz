const express = require("express");
const router = express.Router();
const shortid = require('shortid');
const { auth } = require("../common/auth");
const { validateBody, partiallyValidateBody, validateSubmitForm } = require("../common/http");
const { checkQuizOwnership } = require("../common/validations");
const sendEmail = require('../common/email');

const Question = require("../model/Question");
const Quiz = require("../model/Quiz");
const Student = require('../model/Student');

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
  });

router.get("", async (req, res) => {
  try {
    const code = req.query.code;
    const quiz = await Quiz.getByCodePopulated(code);
    const status = quiz.getProgressStatus();
    if (status !== 0) {
      res.status(404).json({
        message: "This quiz isn't in progress. Check the starting date, duration and status.",
        date: quiz.date, duration: quiz.duration, status: status
      });
    } else {
      res.status(200).json({ _id: quiz._id, name: quiz.name, date: quiz.date, duration: quiz.duration, questions: quiz.questions });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Could not load item" });
  }
});

router.post("/:id/student", auth, checkQuizOwnership, validateBody(['id']), async (req, res) => {
  try {
    await req.classroom.checkIfEnrolled(req.body.id);
    const quiz = await Quiz.findById(req.params.id);
    await quiz.checkIfEnrolled(req.body.id, false);
    quiz.students.push({ id: req.body.id, code: shortid.generate(), points: [] });
    await quiz.save();
    res.status(200).json(quiz);
  } catch (e) {
    res.status(400).json({ message: 'Could not add student' });
  }
});

router.delete('/:id/student', auth, checkQuizOwnership, validateBody(['id']), async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    await quiz.checkIfEnrolled(req.body.id, true);
    await quiz.update({ $pull: { students: { id: req.body.id } } });
    res.status(200).json({ message: 'Student removed from quiz' });
  } catch (e) {
    res.status(400).json({ message: 'Could not remove student' });
  }
});

router.get('/:id/students', auth, checkQuizOwnership, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    const studentIds = quiz.students.map(s => s.id);
    const students = await Student.find({ _id: { $in: studentIds } });
    res.status(200).json(students);
  } catch (e) {
    res.status(400).json({ message: 'Unable to load items' });
  }
});

router.post("/:id/generate-code/:studentId", auth, checkQuizOwnership, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    await quiz.checkIfEnrolled(req.params.studentId, true);
    await quiz.generateCode(req.params.studentId, shortid.generate());
    res.status(201).json(quiz);
  } catch (e) {
    res.status(400).json({ message: 'Unable to send quiz code' });
  }
});

router.post('/:id/send-code/:studentId', auth, checkQuizOwnership, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    await quiz.checkIfEnrolled(req.params.studentId, true);
    const { email, code } = await quiz.getStudentById(req.params.studentId);
    const { result, full } = await sendEmail(email, `Code for quiz ${quiz.name}`, `Your access code is ${code}`);
    res.status(200).json({ result });
  } catch (e) {
    res.status(400).json({ message: 'Unable to send quiz code' });
  }
});

router.post('/:id/send-code', auth, checkQuizOwnership, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    for (const s of quiz.students) {
      const { email, code } = await quiz.getStudentById(s.id);
      await sendEmail(email, `Code for quiz ${quiz.name}`, `Your access code is ${code}`);
    }
    res.status(200).json({ result: 'Mails sent successfully' });
  } catch (e) {
    res.status(400).json({ message: 'Unable to send quiz code' });
  }
});

//please look at this!!!!!!!!!!
router.post("/:id/submit", validateBody(["submitForm", "date"]),
  validateSubmitForm(["questionId", "selectedAnswers"]), async (req, res) => {
    try {
      let quiz = await Quiz.getQuizByIdPopulated(req.params.id);
      quiz.checkSubmitDate(req.body.date);
      quiz.checkCode(req.query.code);
      const index = await quiz.submitAnswers(req.query.code, req.body.submitForm);
      res.status(200).json({ pointsPerQuestion: quiz.students[index].points });
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: 'Unable to submit' });
    }
  })

module.exports = router;
