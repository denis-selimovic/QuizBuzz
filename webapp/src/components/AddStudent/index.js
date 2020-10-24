import React, { useState, useEffect } from "react";
import {Form, Select, Button, Card} from "antd";
import { getBaseUrl } from "../../common/config";
import { getToken } from "../../auth/utils";
import axios from 'axios';

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
    const { onSubmit, id } = props;
    const [form] = Form.useForm();
    const [students, setStudents] = useState([]);
    const [value, setValue] = useState(null);

    useEffect(() => {
        async function hook () {
            await loadStudents();
        }
        hook();
    }, []);

    const loadStudents = async () => {
        const response = await axios.get(`${getBaseUrl()}/quizzes/${id}/not-enrolled`, {
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        });
        setStudents(response.data);
    };

    const onFinish = async () => {
        if (!value) return;
        const response = await axios.post(`${getBaseUrl()}/quizzes/${id}/student`, { id: value }, {
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        });
        setValue(null);
        const { data } = response;
        const studentWithCode = data.students.find(s => s.id === value);
        const student = students.find(s => s._id === value);
        const st = students.filter(s => s._id !== value);
        setStudents(st);
        onSubmit({ key: student._id, name: student.name, surname: student.surname, email: student.email, code: studentWithCode.code });
    }

    const onFinishFailed = data => {}

    const generateList = () => {
        return students.map(s => <Select.Option key={s._id} value={s._id}>{`${s.name} ${s.surname}`}</Select.Option>)
    }

    return (
        <div>
            <Card>
                <Form form={form} {...formItemLayout} name="register" initialValues={{ remember: true }}
                      onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Select name="select" onChange={value => setValue(value)} style={{ width: '500px', marginBottom: '15px' }} value={value}>
                        {generateList()}
                    </Select>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Add student</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
