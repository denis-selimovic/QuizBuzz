import React, { useState } from "react";
import { View, TextInput, Button } from "react-native-web";

const EnterCode = (props) => {
    // const [value, onChangeText] = React.useState("");
    const { navigation, link } = props;
    return (
        <View>
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
