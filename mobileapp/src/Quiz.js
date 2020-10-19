import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from "@ant-design/react-native";
import QuizQuestions from "./QuizQuestions";

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
    const { status, code, date, duration } = props.route.params;

    return (
        <View>
            <QuizQuestions questions={questions} />
        </View>
    );
}
