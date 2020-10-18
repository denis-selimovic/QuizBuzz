import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, WhiteSpace } from "@ant-design/react-native";
import Input from '@ant-design/react-native/lib/input-item/Input';
import style from "./styles/style";

export default function (props) {
    const { navigation, buttonText, link, inputPlaceholder } = props;
    const [code, setCode] = useState("");

    return (
        <View style={style.body}>
            <Input value={code} placeholder={inputPlaceholder} onChangeText={c => setCode(c)} style={style.input}></Input>
            <WhiteSpace size="xl"></WhiteSpace>
            <Button onPress={() => navigation.navigate(link)} style={style.button}>
                <Text style={style.text}>{buttonText}</Text>
            </Button>
        </View>
    );
}
