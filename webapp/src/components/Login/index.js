import React from 'react';
import { Link as RedirectLink } from "react-router-dom";
import { Form, Input, Button, Space, Image, Card } from 'antd';
import "./login.css"

export default (props) => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Space direction="vertical" className="center">
            <Image src="/images/logo.png"></Image>
            <Card>
                <Form name="basic" initialValues={{ remember: true }}
                    onFinish={onFinish} onFinishFailed={onFinishFailed}>

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
                    <RedirectLink to="/register">Don't have an account? Register.</RedirectLink>
                </Form>
            </Card>
        </Space>
    );
};
