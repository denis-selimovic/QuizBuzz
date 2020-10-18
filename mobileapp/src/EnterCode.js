import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from "@ant-design/react-native";

export default function (props) {
    const { navigation, buttonText, link } = props;
    return (
        <View>
            <Button onPress={() => navigation.navigate(link)}>{buttonText}</Button>
        </View>
    );
}
