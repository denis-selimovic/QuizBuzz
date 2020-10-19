import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Pagination, Button, Flex } from "@ant-design/react-native";

import Question from "./Question";
import Timer from "./Timer";

export default (props) => {
    const { questions, onSubmit, duration, readonly } = props;

    const [question, setQuestion] = useState(questions[0]);
    const [index, setIndex] = useState(1)

    const changeQuestion = index => {
        setIndex(index)
        setQuestion(questions[index - 1]);
    }

    const onPressed = () => {
        if (readonly) return;
        const submit = { date: Date.now(), submitForm: [] };
        questions.forEach(q => submit.submitForm.push({ questionId: q._id, selectedAnswers: q.selectedAnswers }));
        onSubmit();
    };

    const showButton = () => {
        if (readonly) return null;
        if (index !== questions.length) return null;
        return (
            <View style={styles.btnContainer}>
                <Button style={styles.button} type="primary" onPress={onPressed}>Submit</Button>
            </View>
        );
    }

    const showTimer = () => {
        if (readonly) return null;
        return <Timer duration={duration} timeCallback={onPressed}/>
    }

    return (
        <View style={styles.container}>
            {showTimer()}
            <Question question={question} readonly={readonly} />
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
