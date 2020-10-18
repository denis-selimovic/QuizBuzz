import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Checkbox } from "@ant-design/react-native";

export default (props) => {
    const { answers, onChecked, selected } = props;

    const setChecked = id => {
        return selected.includes(id);
    };

    const renderAnswers = () => {
        return answers.map(a => {
            return (
                <View key={a._id} style={styles.answer}>
                    <Checkbox key={a._id} defaultChecked={setChecked(a._id)} onChange={params => changeAnswer(params, a._id)}>{a.content}</Checkbox>
                </View>
            );
        });
    };

    const changeAnswer = (params, answerId) => {
        const p = Object(params);
        onChecked(answerId, p.target.checked);
    }

    return (
        <ScrollView style={styles.container}>
            {renderAnswers()}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    answer: {
        height: 70,
        paddingLeft: 10,
        paddingRight: 10,
        minWidth: 300
    },
    container: {
        flexGrow: 1,
        marginTop: 20,
        maxHeight: 400
    }
})
