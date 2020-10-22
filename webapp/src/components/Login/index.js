import React, { useState } from 'react';
import { Link as RedirectLink } from "react-router-dom";
import { Form, Input, Button, Space, Image, Card, Typography } from 'antd';
import "./login.css";
import axios from "axios";
import { saveToken, saveUser } from '../../auth/utils';

export default (props) => {
    const [errorMessage, setErrorMessage] = useState();

    const logIn = async credentials => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, credentials);
            const { id, username, name, surname, email, token } = response;
            saveUser({ id, username, name, surname, email });
            saveToken(token);
        } catch (e) {
            handleLoginError(e);
        }
    }

    const handleLoginError = error => {
        if (error.response && error.response.status === 403) {
            setErrorMessage(error.response.message);
        } else {
            setErrorMessage("Something went wrong, try that again!");
        }
    }

    const onFinish = async credentials => {
        await logIn(credentials);
    };

    return (
        <Space direction="vertical" className="center">
            <Image src="/images/logo.png"></Image>
            <Card>
                <Form name="basic" initialValues={{ remember: true }}
                    onFinish={onFinish}>

                    <Form.Item label="Username" name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit"> Log in </Button>
                    </Form.Item>
                    <Typography>{errorMessage}</Typography>
                    <RedirectLink to="/register">Don't have an account? Register.</RedirectLink>
                </Form>
            </Card>
        </Space>
    );
};
