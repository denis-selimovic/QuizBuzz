import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Checkbox } from "@ant-design/react-native";

export default (props) => {
    const { answers, onChecked, selected, readonly } = props;

    const setChecked = id => {
        return selected.includes(id);
    };

    const getIcon = a => {
        return a.correct ? require("../src/images/correct.png") : require("../src/images/incorrect.png");
    }

    const getCheckbox = (a) => {
        if (!readonly) {
            return (
                <View key={a._id} style={styles.answer}>
                    <Checkbox key={a._id} defaultChecked={setChecked(a._id)} onChange={params => changeAnswer(params, a._id)}>
                        {a.content}
                    </Checkbox>
                </View>
            )
        }
        return (
            <View key={a._id} style={styles.answerWithIcon}>
                <View style={styles.checkboxContainer}>
                    <Checkbox key={a._id} checked={setChecked(a._id)} disabled={true}>{a.content}</Checkbox>
                </View>
                <View style={styles.imgContainer}>
                    <Image style={styles.image} source={getIcon(a)}/>
                </View>
            </View>
        );
    }

    const renderAnswers = () => {
        return answers.map(a => getCheckbox(a));
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
    },
    image: {
        maxWidth: 25,
        maxHeight: 25
    },
    answerWithIcon: {
        height: 70,
        paddingLeft: 10,
        paddingRight: 10,
        minWidth: 300,
        display: 'flex',
        flexDirection: 'row',
    },
    imgContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        minWidth: 50
    },
    checkboxContainer: {
        minWidth: 250,
        height: 70,
        display: 'flex',
        justifyContent: 'center'
    }
})
