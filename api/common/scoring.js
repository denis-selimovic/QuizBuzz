// {
//     amount: {
//       type: Number,
//       required: true
//     },
//     questionId: {
//       type: String,
//       required: true
//     }
//   }

// {
//     content: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     correct: {
//         type: Boolean,
//         required: true,
//     },
// },


const calculatePoints = (question, selectedAnswers) => {
    if (question.scoringSystem === 0) {
        return scoreBinary(question.points, question.answers, selectedAnswers);
    } else if (question.scoringSystem === 1) {
        return scorePartially(question.points, question.answers, selectedAnswers);
    } else {
        return scorePartiallyWithNegative(question.points, question.answers, selectedAnswers);
    }
}

const scoreBinary = (points, answers, selectedAnswers) => {
    if (selectedAnswers.length === 0) return 0;
    const incorrect = answers.some(a => {
        return (a.correct && !selectedAnswers.includes(a._id.toString()))
            || (!a.correct && selectedAnswers.includes(a._id.toString()));
    });

    if (incorrect) return 0;
    return points;
}

const scorePartially = (points, answers, selectedAnswers) => {
    if (selectedAnswers.length === 0) return 0;
    let numberOfCorrect = 0;
    answers.forEach(answer => {
        if (answer.correct && selectedAnswers.includes(answer._id.toString())) {
            numberOfCorrect++;
        }
    });

    const numberOfAnswers = answers.length;
    const total = numberOfCorrect * (points / parseFloat(numberOfAnswers));
    return Math.round((total + Number.EPSILON) * 100) / 100;
}

const scorePartiallyWithNegative = (points, answers, selectedAnswers) => {
    if (selectedAnswers.length === 0) return 0;
    let numberOfCorrect = 0;
    let incorrect = false;
    answers.forEach(answer => {
        if (!answer.correct && selectedAnswers.includes(answer._id.toString())) {
            incorrect = true;
        }

        if (answer.correct && selectedAnswers.includes(answer._id.toString())) {
            numberOfCorrect++;
        }
    });

    if (incorrect) return -points / 2.0;

    const numberOfAnswers = answers.length;
    const total = numberOfCorrect * (points / numberOfAnswers);
    return Math.round((total + Number.EPSILON) * 100) / 100;
}

module.exports = {
    calculatePoints
};