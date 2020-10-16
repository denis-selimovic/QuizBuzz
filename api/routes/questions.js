const express = require("express");
const router = express.Router();
const { auth } = require("../common/auth");
const { validateBody, partiallyValidateBody } = require("../common/http");
const { checkQuestionOwnership } = require("../common/validations");
const Question = require("../model/Question");

router.delete("/:id", auth, checkQuestionOwnership, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        await question.remove();
        res.status(200).json({ message: "Item successfully deleted!" });
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: "Could not load item" });
    }
});

router.patch("/:id", auth, checkQuestionOwnership,
    partiallyValidateBody(["text", "answers", "points", "scoringSystem"]), async (req, res) => {
        try {
            const question = await Question.updateQuestionById(req.params.id, req.body);
            res.status(200).json(question);
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "Could not load item" });
        }
    }
);

router.post("/:id/answer", auth, checkQuestionOwnership, validateBody(["content", "correct"]), async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        question.answers.push(req.body);
        await question.save();
        res.status(200).json(question);
    } catch (e) {
        console.log(error);
        res.status(400).json({ message: "Could not load item" });
    }
});

router.patch("/:id/answer/:aid", auth, checkQuestionOwnership,
    partiallyValidateBody(["content", "correct"]), async (req, res) => {
        try {
            const question = await Question.findById(req.params.id);
            await question.updateAnswer(req.params.aid, req.body);
            res.status(200).json(question);
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "Could not load item" });
        }
    });

router.delete("/:id/answer/:aid", auth, checkQuestionOwnership, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        await question.deleteAnswer(req.params.aid);
        res.status(200).json(question);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: "Could not load item" });
    }
});
module.exports = router;
