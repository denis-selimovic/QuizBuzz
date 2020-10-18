import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Button, WhiteSpace } from "@ant-design/react-native";
import Input from '@ant-design/react-native/lib/input-item/Input';
import style from "./styles/style";

export default function (props) {
    const { navigation, buttonText, link, inputPlaceholder, sendCode } = props;
    const [code, setCode] = useState();
    const [params, setParams] = useState();

    useState(() => {
        props.route.params ? setParams(props.route.params.params) : setParams(null);
    })

    return (
        <View style={style.body}>
            <Image source={require("../src/images/logo.png")}></Image>
            <WhiteSpace size="xl"></WhiteSpace>
            <WhiteSpace size="xl"></WhiteSpace>
            <Input value={code} placeholder={inputPlaceholder} onChangeText={c => setCode(c)} style={style.input}></Input>
            <WhiteSpace size="xl"></WhiteSpace>
            <Button onPress={() => sendCode(code, (params) => navigation.navigate(link, { params }), params)} style={style.button}>
                <Text style={style.text}>{buttonText}</Text>
            </Button>
        </View>
    );
}
