import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Answers from "./Answers";

export default (props) => {
    const { question, readonly } = props;
    const q = Object(question);

    const onChecked = (answerId, checked) => {
        if (readonly) return;
        if (checked) {
            q.selectedAnswers.push(answerId);
        }
        else {
            q.selectedAnswers = q.selectedAnswers.filter(ans => ans !== answerId);
        }
    }
    if(!q.selectedAnswers) return null;
    return (
        <View style={styles.container}>
            <Text style={styles.question}>{q.text}</Text>
            <Answers answers={q.answers} selected={q.selectedAnswers} onChecked={onChecked} readonly={readonly}/>
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
