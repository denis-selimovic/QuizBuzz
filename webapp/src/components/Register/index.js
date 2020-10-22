import React, { useState } from 'react';
import { Form, Input, Button, Space, Image, Card, Typography } from 'antd';
import { Link as RedirectLink } from "react-router-dom";
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

export default function Register(props) {
    const [errorMessage, setErrorMessage] = useState();
    const [form] = Form.useForm();

    const onFinish = async data => {
        await register(data);
    };

    const register = async data => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_LOCALHOST}/users/register`, data);
            console.log(response);
        } catch (error) {

        }
    }

    return (
        <Space direction="vertical" className="center">
            <Image src="/images/logo.png"></Image>
            <Card>
                <Form form={form} {...formItemLayout} name="register" initialValues={{ remember: true }}
                    onFinish={onFinish}>

                    <Form.Item label="Username" name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password />
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
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label="Name" name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Surname" name="surname"
                        rules={[{ required: true, message: 'Please input your surname!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit"> Log in </Button>
                    </Form.Item>

                    <Typography>{errorMessage}</Typography>
                </Form>
            </Card>
            <RedirectLink to="/login">Already have an account? Log in.</RedirectLink>
        </Space>
    )
}