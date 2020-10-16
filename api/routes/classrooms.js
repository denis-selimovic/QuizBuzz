const express = require("express");
const router = express.Router();
const { auth } = require("../common/auth");
const { validateBody } = require("../common/http");
const { checkClassroomOwnership } = require('../common/validations');

const Quiz = require("../model/Quiz");
const Classroom = require("../model/Classroom");


router.post('/create', auth, validateBody(['name']), async (req, res) => {
    const code = req.body.name.concat('-', Classroom.generateRandomId());
    const classroom = new Classroom({ code });
    await classroom.save();
    await req.user.addClassroom(classroom);
    res.status(201).json(classroom);
});

router.delete('/:id', auth, checkClassroomOwnership, async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        await classroom.remove();
        res.status(200).json({ message: 'Classroom successfully deleted' });
    } catch (e) {
        res.status(403).json({ message: e.message });
    }
});

//create quiz for classroom
//dodati auth
router.post(
  "/:id/quiz",
  validateBody(["name", "date", "duration"]),
  async (req, res) => {
    try {
      const classroom = await Classroom.getClassroomByIdAndPopulate(
        req.params.id,
        "quizes"
      );

      //provjeriti da li je trenutni user vlasnik ovog classrooma

      const quiz = new Quiz(req.body);
      await quiz.save();
      classroom.quizes.push(quiz);
      await classroom.save();
      res.status(201).json(quiz);
    } catch (e) {
      console.log(e.message);
      res.status(400).message("Unable to load item");
    }
  }
);

module.exports = router;
