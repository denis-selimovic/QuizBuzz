import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Answers from "./Answers";

export default (props) => {
    const { question } = props;
    const q = Object(question);

    const onChecked = (answerId, checked) => {
        if (checked) {
            q.selectedAnswers.push(answerId);
        }
        else {
            q.selectedAnswers = q.selectedAnswers.filter(ans => ans !== answerId);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{q.text}</Text>
            <Answers answers={q.answers} selected={q.selectedAnswers} onChecked={onChecked}/>
        </View>
    );
};

const styles = StyleSheet.create({
    question: {
        fontSize: 22,
        minHeight: 40
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});
