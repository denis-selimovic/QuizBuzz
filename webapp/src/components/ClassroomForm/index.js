import React from "react";
import './classroomForm.css';
import {Form, Input, Button, Card} from "antd";
import axios from 'axios';
import { getBaseUrl } from "../../common/config";
import { getToken } from "../../auth/utils";

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

export default props => {
    const { onSubmit } = props;
    const [form] = Form.useForm();

    const onFinish = async data => {
        const response = await axios.post(`${getBaseUrl()}/classrooms/create`, data, {
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        });
        const c = response.data;
        onSubmit({ key: c._id, classroom: c.code.split('-')[0], code: c.code, students: 0 });
    };

    const onFinishFailed = data => {}

    return (
        <div className="form-container">
            <Card className="form">
                <Form form={form} {...formItemLayout} name="register" initialValues={{ remember: true }}
                      onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item label="Name" name="name"
                               rules={[{ required: true, message: 'Please input classroom name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit"> Create classroom</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
