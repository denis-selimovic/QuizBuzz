import React, { useState } from 'react';
import { Form, Input, Button, Space, Image, Card, Typography } from 'antd';
import { Link as RedirectLink, withRouter } from "react-router-dom";
import "./register.css";
import axios from "axios";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 30,
            offset: 0,
        },
        sm: {
            span: 30,
            offset: 10,
        },
    },
};
const errorMessageStyle = {
    color: "#FF0000"
};

export default withRouter(({ history }) => {
    const [errorMessage, setErrorMessage] = useState();
    const [form] = Form.useForm();

    const onFinish = async data => {
        await register(data);
    };

    const register = async data => {
        try {
            const requestBody = {
                name: data.name, surname: data.surname,
                password: data.password, email: data.email, username: data.username
            };
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, requestBody);
            setErrorMessage("Successfully registered");
            setTimeout(() => history.push("/login"), 2000);
        } catch (error) {
            handleLoginError(error);
        }
    }

    const handleLoginError = e => {
        if (e.response && e.response.status === 401) {
            setErrorMessage(e.response.data.message);
        } else {
            setErrorMessage("Something went wrong, try that again!");
        }

        form.resetFields();
    }

    const resetErrorMessage = () => {
        setErrorMessage("");
    }

    return (
        <Space direction="vertical" className="center">
            <Image src="/images/logo.png"></Image>
            <Card>
                <Form form={form} {...formItemLayout} name="register" initialValues={{ remember: true }}
                    onFinish={onFinish}>

                    <Form.Item label="Username" name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input onChange={resetErrorMessage} />
                    </Form.Item>

                    <Form.Item label="Email" name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input onChange={resetErrorMessage} />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password onChange={resetErrorMessage} />
                    </Form.Item>

                    <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback
                        rules={[{ required: true, message: 'Please confirm your password!', },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                        ]}
                    >
                        <Input.Password onChange={resetErrorMessage} />
                    </Form.Item>

                    <Form.Item label="Name" name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}>
                        <Input onChange={resetErrorMessage} />
                    </Form.Item>

                    <Form.Item label="Surname" name="surname"
                        rules={[{ required: true, message: 'Please input your surname!' }]}>
                        <Input onChange={resetErrorMessage} />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit"> Register </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Typography style={errorMessageStyle}>{errorMessage}</Typography>
            <RedirectLink to="/login">Already have an account? Log in.</RedirectLink>
        </Space>
    )
});