import React, { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';

import QuizQuestions from "./QuizQuestions";
import Timer from "./Timer";

export default function (props) {
    const { status, code, classroomId, quiz } = props.route.params;
    const { date, duration } = props.route.params.quiz;

    const [quizState, setQuizState] = useState(status);
    const [loadedQuiz, setLoadedQuiz] = useState(quiz);
    const [results, setResults] = useState(null);

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

    const fetch = async code => {
        if (loadedQuiz.questions) return;
        const response = await axios.get(`${BASE_URL}/quizzes?code=${code}&classroomId=${classroomId}`);
        setLoadedQuiz(response);
    };

    const fetchQuiz = async code => {
        await fetch(code);
        setQuizState(0);
    };

    const submitQuiz = async (code, submit) => {
        submit.classroomId = classroomId;
        await axios.post(`${BASE_URL}/quizzes/${loadedQuiz._id}/submit`, submit);
        setQuizState(1);
    }

    const fetchQuizResults = async code => {
        await fetch(code);
        const response = await axios.get(`${BASE_URL}/quizzes/${code}/results`);
        setResults(response);
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
            <QuizQuestions questions={loadedQuiz.questions} duration={getQuizTimer()} onSubmit={(submit) => submitQuiz(code, submit)} readonly={false} />
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
            <QuizQuestions questions={loadedQuiz.questions} duration={getQuizTimer()} onSubmit={(submit) => submitQuiz(code, submit)} readonly={true} />
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

