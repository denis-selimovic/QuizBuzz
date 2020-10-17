import React, { useState } from "react";
import {
    TextInput,
    View,
    Button
} from "react-native";

const EnterCode = (props) => {
    const [value, onChangeText] = React.useState("");
    return (
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}>
            </TextInput>
            <Button
                // onPress={console.log(pressed)}
                title={props.text}
                color="#841584"
            />
        </View >
    );
}

export default EnterCode;