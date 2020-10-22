import React, { useState } from 'react';
import { Link as RedirectLink, withRouter } from "react-router-dom";
import { Form, Input, Button, Space, Image, Card, Typography } from 'antd';
import "./login.css";
import axios from "axios";
import { saveToken, saveUser } from '../../auth/utils';

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

export default withRouter(({ history }) => {
    const [errorMessage, setErrorMessage] = useState();
    const [form] = Form.useForm();

    const onFinish = async credentials => {
        await logIn(credentials);
    };

    const logIn = async credentials => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, credentials);
            const { id, username, name, surname, email, token } = response.data;
            saveUser({ id, username, name, surname, email });
            saveToken(token);
            history.push("/dashboard");
        } catch (e) {
            handleLoginError(e);
        }
    }

    const handleLoginError = e => {
        if (e.response && e.response.status === 403) {
            setErrorMessage(e.response.data.message);
        } else {
            setErrorMessage("Something went wrong, try that again!");
        }

        form.resetFields();
    }

    return (
        <Space direction="vertical" className="center">
            <Image src="/images/logo.png"></Image>
            <Card>
                <Form form={form} {...formItemLayout} name="login" initialValues={{ remember: true }}
                    onFinish={onFinish}>

                    <Form.Item label="Username" name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input onChange={() => setErrorMessage("")} />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password onChange={() => setErrorMessage("")} />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit"> Log in </Button>
                    </Form.Item>
                    <Typography>{errorMessage}</Typography>
                </Form>
            </Card>
            <RedirectLink className="redirect-text" to="/register">Don't have an account? Register.</RedirectLink>
        </Space>
    );
});
