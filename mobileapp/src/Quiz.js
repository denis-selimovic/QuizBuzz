import React, { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';

import QuizQuestions from "./QuizQuestions";
import Timer from "./Timer";

export default function (props) {
    const { status, code, date, duration, classroomId } = props.route.params;

    const [quizState, setQuizState] = useState(status);
    const [quiz, setQuiz] = useState(null);

    const getStartTimer = () => {
        return Math.round(Math.abs(date.valueOf() - Date.now()) / 1000);
    }

    const getEndTimer = () => {
        const endDate = new Date(date.valueOf() + duration * 60);
        return Math.round(Math.abs(endDate.valueOf() - Date.now()) / 1000);
    }

    const getQuizTimer = () => {
        return Math.round(duration * 60 / 1000);
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
            <QuizQuestions questions={quiz.questions} duration={getQuizTimer()} onSubmit={() => submitQuiz(code)} readonly={false} />
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
            <QuizQuestions questions={quiz.questions} duration={getQuizTimer()} onSubmit={() => submitQuiz(code)} readonly={true} />
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
