import React, { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';

import QuizQuestions from "./QuizQuestions";
import Timer from "./Timer";

export default function (props) {
    const { status, code, classroomId, quiz } = props.route.params;
    const { date, duration } = props.route.params.quiz;

    const [quizState, setQuizState] = useState(status);
    const [loadedQuiz, setLoadedQuiz] = useState(quiz);

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

