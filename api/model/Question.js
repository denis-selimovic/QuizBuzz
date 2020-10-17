const mongoose = require("mongoose");
const { Schema } = mongoose;
const { calculatePoints } = require("../common/scoring");

const questionSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    answers: [
        {
            content: {
                type: String,
                required: true,
                trim: true,
            },
            correct: {
                type: Boolean,
                required: true,
            },
        },
    ],
    points: {
        type: Number,
        required: true,
    },
    scoringSystem: {
        type: Number,
        required: true,
        min: 0,
        max: 2,
    },
});

questionSchema.methods.quiz = async function () {
    const Quiz = this.model("Quiz");
    return await Quiz.findOne({
        questions: { $elemMatch: { $eq: { _id: this._id } } },
    }).exec();
};

questionSchema.pre("remove", async function (next) {
    const quiz = await this.quiz();
    quiz.questions.remove(this);
    await quiz.save();
    next();
});

questionSchema.statics.updateQuestionById = async (id, newQuestion) => {
    const question = await Question.findById(id);
    Object.keys(newQuestion).forEach((key) => (question[key] = newQuestion[key]));
    await question.save();
    return question;
};

questionSchema.methods.updateAnswer = async function (id, newAnswer) {
    const answer = this.answers.find(answer => answer._id.toString() === id.toString());
    if (!answer) {
        throw Error();
    }
    Object.keys(newAnswer).forEach(key => {
        answer[key] = newAnswer[key];
    });
    await this.save();
}

questionSchema.methods.deleteAnswer = async function (id) {
    const index = this.answers.findIndex(answer => answer._id.toString() === id.toString());
    if (index === -1) {
        throw Error();
    }
    this.answers.splice(index);
    await this.save();
}

questionSchema.statics.scoreQuestion = async function (q, quiz) {
    const question = await Question.findById(q.questionId);
    const realQuiz = await question.quiz();
    if (realQuiz._id.toString() !== quiz._id.toString()) {
        return null;
    }

    const amount = calculatePoints(question, q.selectedAnswers);
    return { amount: amount, questionId: question._id };
}

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
