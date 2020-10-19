import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Pagination, Button, Flex } from "@ant-design/react-native";

import Question from "./Question";
import Timer from "./Timer";

export default (props) => {
    const { questions } = props;

    const [question, setQuestion] = useState(questions[0]);
    const [index, setIndex] = useState(1)

    const changeQuestion = index => {
        setIndex(index)
        setQuestion(questions[index - 1]);
    }

    const onPressed = () => {
        const submit = { date: Date.now(), submitForm: [] };
        questions.forEach(q => submit.submitForm.push({ questionId: q._id, selectedAnswers: q.selectedAnswers }));
        console.log(submit);
    };

    const showButton = () => {
        if (index !== questions.length) return null;
        return (
            <View style={styles.btnContainer}>
                <Button style={styles.button} type="primary" onPress={onPressed}>Submit</Button>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Timer duration={1} timeCallback={onPressed}/>
            <Question question={question} />
            <Pagination mode="button" current={index} total={questions.length} locale={{ prevText: 'Previous', nextText: 'Next' }} onChange={changeQuestion} />
            {showButton()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10
    },
    button: {
        minWidth: 150,
        maxWidth: 250
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
});
