import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card } from "antd";
import axios from 'axios';
import './studentForm.css';

import TOKEN from "../../token";

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

const StudentForm = (props) => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const onFinish = async form => {
        const classroom = location.pathname.split('/')[2];
        if (!classroom) return;
        await axios.post(`${process.env.REACT_APP_BASE_URL}/classrooms/${classroom}/student`, form, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        });
        navigate(`/dashboard/${classroom}/students`);
    }

    const onFinishFailed = e => {

    }

    return (
        <div className="form-container">
            <Card className="form">
                <Form form={form} {...formItemLayout} name="register" initialValues={{ remember: true }}
                      onFinish={onFinish} onFinishFailed={onFinishFailed}>

                    <Form.Item label="Email" name="email"
                               rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input />
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
                        <Button type="primary" htmlType="submit"> Add student </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default StudentForm;
