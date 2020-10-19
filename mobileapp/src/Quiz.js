import React ,{ useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import QuizQuestions from "./QuizQuestions";
import Timer from "./Timer";

const questions = [
    {
        text: 'First question',
        answers: [
            {
                content: 'First answer',
                correct: true,
                _id: 1
            },
            {
                content: 'Second answer',
                correct: false,
                _id: 2
            },
            {
                content: 'Third answer',
                correct: true,
                _id: 3
            },
            {
                content: 'Fourth answer',
                correct: false,
                _id: 4
            }
        ],
        points: 1,
        scoringSystem: 0,
        _id: 0,
        selectedAnswers: []
    },
    {
        text: 'Second question',
        answers: [
            {
                content: 'First answer',
                correct: true,
                _id: 5
            },
            {
                content: 'Second answer',
                correct: true,
                _id: 6
            },
            {
                content: 'Third answer',
                correct: true,
                _id: 7
            },
            {
                content: 'Fourth answer',
                correct: false,
                _id: 8
            }
        ],
        points: 1,
        scoringSystem: 0,
        _id: 1,
        selectedAnswers: []
    },
    {
        text: 'Third question',
        answers: [
            {
                content: 'First answer',
                correct: true,
                _id: 9
            },
            {
                content: 'Second answer',
                correct: false,
                _id: 10
            },
            {
                content: 'Third answer',
                correct: false,
                _id: 11
            },
            {
                content: 'Fourth answer',
                correct: false,
                _id: 12
            },
            {
                content: 'First answer',
                correct: true,
                _id: 13
            },
            {
                content: 'Second answer',
                correct: false,
                _id: 14
            },
            {
                content: 'Third answer',
                correct: false,
                _id: 15
            },
            {
                content: 'Fourth answer',
                correct: false,
                _id: 16
            }
        ],
        points: 1,
        scoringSystem: 0,
        _id: 2,
        selectedAnswers: []
    }
];

export default function (props) {
    const { status, code, date, duration } = props;

    const [quizState, setQuizState] = useState(status);

    const getStartTimer = () => {
        const startDate = new Date(date);
        return Math.round(Math.abs(startDate.valueOf() - Date.now()) / 1000);
    }

    const getEndTimer = () => {
        const endDate = new Date(date + duration);
        return Math.round(Math.abs(endDate.valueOf() - Date.now()) / 1000);
    }

    const getQuizTimer = () => {
        return Math.round(duration / 1000);
    }

    const fetchQuiz = code => {
        setQuizState(0);
    };

    const submitQuiz = code => {
        setQuizState(1);
    }

    const fetchQuizResults = code => {
        setQuizState(2);
    }

    const renderBeforeQuizTimer = () => {
        if (quizState !== -1) return null;
        return (
            <Timer duration={getStartTimer()} timeCallback={() => fetchQuiz(code)} />
        );
    }

    const renderQuiz = () => {
        if (quizState !== 0) return null;
        return (
            <QuizQuestions questions={questions} duration={getQuizTimer()} onSubmit={() => submitQuiz(code)} readonly={false}/>
        );
    }

    const renderAfterQuizTimer = () => {
        if (quizState !== 1) return null;
        return (
            <Timer duration={getEndTimer()} timeCallback={() => fetchQuizResults(code)} />
        );
    }

    const renderResults = () => {
        if (quizState !== 2) return null;
        return (
            <QuizQuestions questions={questions} duration={getQuizTimer()} onSubmit={() => submitQuiz(code)} readonly={true}/>
        );
    }

    return (
        <View>
            {renderBeforeQuizTimer()}
            {renderQuiz()}
            {renderAfterQuizTimer()}
            {renderResults()}
        </View>
    );
}
