const express = require("express");
const router = express.Router();
const { auth } = require("../common/auth");
const { validateBody, partiallyValidateBody } = require("../common/http");
const { checkClassroomOwnership } = require("../common/validations");

const Quiz = require("../model/Quiz");
const Classroom = require("../model/Classroom");
const Student = require('../model/Student');

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
  "/:id/quiz", auth, checkClassroomOwnership, validateBody(["name", "date", "duration"]),
  async (req, res) => {
    try {
      const classroom = await Classroom.getClassroomByIdAndPopulate(req.params.id, "quizzes");
      const quiz = new Quiz(req.body);

      await quiz.save();
      await classroom.addQuiz(quiz)
      res.status(201).json(quiz);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Unable to load item" });
    }
  }
);

router.post('/:id/student', auth, checkClassroomOwnership, validateBody(['name', 'surname', 'email']), async (req, res) => {
  try {
    const classroom = await Classroom.getClassroomByIdAndPopulate(req.params.id, 'students');
    await classroom.checkForDuplicate(req.body.email);
    const student = new Student(req.body);
    await student.save();
    await classroom.addStudent(student);
    res.status(201).json(student);
  } catch (e) {
    res.status(401).json({ message: 'Unable to add student' });
  }
});

router.delete('/:id/student', auth, checkClassroomOwnership, validateBody(['id']), async (req, res) => {
  try {
    const classroom = await Classroom.getClassroomByIdAndPopulate(req.params.id, 'students');
    await classroom.checkIfEnrolled(req.body.id);
    const student = await Student.findOne({ _id: req.body.id }).exec();
    await student.remove();
    res.status(201).json({ message: 'Student successfully deleted' });
  } catch (e) {
    res.status(401).json({ message: 'Unable to delete student' });
  }
});

router.patch("/:id/student/:studentId", auth, checkClassroomOwnership, partiallyValidateBody(['name', 'surname', 'email']), async (req, res) => {
  try {
    const classroom = await Classroom.getClassroomByIdAndPopulate(req.params.id, { path: 'students', model: 'Student' });
    await classroom.checkIfEnrolled(req.params.studentId);
    const student = await Student.updateById(req.params.studentId, req.body);
    res.status(201).json(student);
  } catch (e) {
    res.status(403).json({ message: 'Could not update item' });
  }
});

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

router.get("/:id/students", auth, checkClassroomOwnership, async (req, res) => {
  try {
    const classroom = await Classroom.getClassroomByIdAndPopulate(req.params.id, { path: 'students', model: 'Student' });
    res.status(200).json(classroom.students);
  } catch (e) {
    res.status(400).json({ message: 'Unable to load item' });
  }
});

router.get("/", auth, async (req, res) => {
  const classrooms = await Classroom.find({}).populate('students').populate({ path: 'quizzes', populate: { path: 'questions', model: 'Question' } });
  res.status(200).json(classrooms);
});

router.post('/enter', validateBody(['code']), async (req, res) => {
  try {
    const classroom = await Classroom.findOne({ code: req.body.code }).exec();
    res.status(200).json({ classroomId: classroom._id.toString() });
  } catch (e) {
    res.status(400).json({ message: 'Could not load item' });
  }
});

module.exports = router;
