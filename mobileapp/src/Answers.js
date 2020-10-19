import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Checkbox } from "@ant-design/react-native";

export default (props) => {
    const { answers, onChecked, selected, readonly } = props;

    const setChecked = id => {
        return selected.includes(id);
    };

    const getCheckbox = (a) => {
        if (!readonly) {
            return (
                <Checkbox key={a._id} defaultChecked={setChecked(a._id)} onChange={params => changeAnswer(params, a._id)}>
                    {a.content}
                </Checkbox>
            )
        }
        return (
            <Checkbox key={a._id} checked={setChecked(a._id)} disabled={true}>
                {a.content}
            </Checkbox>
        );
    }

    const renderAnswers = () => {
        return answers.map(a => {
            return (
                <View key={a._id} style={styles.answer}>{getCheckbox(a)}</View>
            );
        });
    };

    const changeAnswer = (params, answerId) => {
        if (readonly) return;
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
        maxHeight: 380
    }
})
