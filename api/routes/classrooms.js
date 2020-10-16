const express = require("express");
const router = express.Router();
const { auth } = require("../common/auth");
const { bodyValidator } = require("../common/http");

const Quiz = require("../model/Quiz");
const Classroom = require("../model/Classroom");

//create quiz for classroom
//dodati auth
router.post("/:id/quiz", async (req, res) => {
  try {
    if (!bodyValidator(Object.keys(req.body), ["name", "date", "duration"])) {
      return res.status(400).json({ message: "Invalid body" });
    }

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
});
