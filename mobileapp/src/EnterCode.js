import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Button, WhiteSpace } from "@ant-design/react-native";
import Input from '@ant-design/react-native/lib/input-item/Input';
import style from "./styles/style";

export default function (props) {
    const { navigation, buttonText, link, inputPlaceholder, sendCode } = props;
    const [code, setCode] = useState();
    const [classroomId, setClassroomId] = useState();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        if (props.route.params) {
            setClassroomId(props.route.params.classroomId)
        }
    })

    return (
        <View style={style.body}>
            <Image source={require("../src/images/logo.png")}></Image>
            <WhiteSpace size="xl"></WhiteSpace>
            <WhiteSpace size="xl"></WhiteSpace>
            <Input value={code} placeholder={inputPlaceholder} onChangeText={c => { setCode(c); setErrorMessage(""); }}
                style={style.input}></Input>
            <WhiteSpace size="xl"></WhiteSpace>
            <Button onPress={async () => await sendCode(code, (params) => navigation.navigate(link, params),
                (errMsg) => { setErrorMessage(errMsg); setCode(""); }, classroomId)}
                style={style.button}>
                <Text style={style.text}>{buttonText}</Text>
            </Button>
            <WhiteSpace size="l"></WhiteSpace>
            <Text style={style.error}>{errorMessage}</Text>
        </View>
    );
}
