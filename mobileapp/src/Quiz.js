import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from "@ant-design/react-native";

export default function Quiz(props) {
    const { navigation } = props;
    return (
        <View>
            <Button onPress={() => navigation.popToTop()}>Back to Login</Button>
        </View>
    );
}
