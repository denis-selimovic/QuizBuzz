import React, { useState } from "react";
import {
    TextInput,
    View,
    Button
} from "react-native";

const EnterCode = (props) => {
    const [value, onChangeText] = React.useState("");
    const { navigation, link } = props;
    return (
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}>
            </TextInput>
            <Button
                // onPress={console.log(pressed)}
                title='Next'
                color="#841584"
                onPress={() => navigation.navigate(link)}
            />
        </View >
    );
}

export default EnterCode;
