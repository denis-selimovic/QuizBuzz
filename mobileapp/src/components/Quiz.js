import React, { useState } from "react";
import { TextInput, View, Button } from "react-native";

const Quiz = (props) => {
    const { navigation} = props;
    return (
        <View>
            <Button onPress={() => navigation.popToTop()} title='Back'/>
        </View >
    );
}

export default Quiz;
