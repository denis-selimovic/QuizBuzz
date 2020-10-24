import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Card, DatePicker, Slider, Typography, InputNumber, Divider } from "antd";
import axios from 'axios';
import './quizEdit.css';
import moment from "moment";
import { getBaseUrl } from "../../common/config";
import Question from "../Question";
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
const greenText = {
    color: "#00FF00"
}
const formStyle = {
    marginBottom: "2"
}

export default (props) => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const [quiz, setQuiz] = useState({});
    const [statusMessage, setStatusMessage] = useState("");
    const [value, setValue] = useState(0);

    useEffect(() => {
        async function fetchQuiz() {
            const response = await axios.get(`${getBaseUrl()}/quizzes/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setQuiz(response.data);
        }
        fetchQuiz();
    }, []);

    useEffect(() => {
        setValue(quiz.duration);
        form.setFieldsValue({
            name: quiz.name,
            date: moment(quiz.date),
            duration: quiz.duration
        });
    }, [quiz]);

    const dateValidation = current => current && current < Date.now();

    const onFinish = async (values) => {
        values.date = values.date._d.valueOf();
        const response = await axios.patch(`${getBaseUrl()}/quizzes/${id}`, values, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        setQuiz(response.data);
        setStatusMessage("Quiz successfully edited!");
        setTimeout(() => setStatusMessage(""), 2000);
    }

    const onDurationChange = value => {
        if (value > 240) value = 240;
        if (value < 1) value = 1;
        form.setFieldsValue({ duration: value });
        setValue(value);
    }

    const addQuestion = async (values, callback) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/quizzes/${id}/question`, values, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setQuiz(response.data);
            setStatusMessage("Question successfully added!");
            setTimeout(() => setStatusMessage(""), 2000);
            callback();
        } catch (e) {
            setStatusMessage("Something went wrong!");
            setTimeout(() => setStatusMessage(""), 2000);
        }
    }

    const deleteQuestion = async questionId => {
        try {
            await axios.delete(`${getBaseUrl()}/questions/${questionId}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            const index = quiz.questions.findIndex(q => q._id === questionId);
            let questions = quiz.questions;
            questions.splice(index, 1);
            setQuiz({ ...quiz, questions: questions })
        } catch (e) {
            setStatusMessage("Something went wrong!");
            setTimeout(() => setStatusMessage(""), 2000);
        }
    }

    return (
        <div className="form-container">
            <div className="col1">
                <Card className="form" style={formStyle}>
                    <Form form={form} {...formItemLayout} name="register"
                        onFinish={onFinish}>
                        <Form.Item label="Name" name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please set quiz date!' }]}>
                            <DatePicker showTime disabledTime={dateValidation} disabledDate={dateValidation} />
                        </Form.Item>

                        <Form.Item label="Duration (min)" name="duration" rules={[{ required: true, message: 'Please set quiz duration!' }]}>
                            <Slider min={1} max={240} onChange={onDurationChange} value={value} />
                            <InputNumber onChange={onDurationChange} value={value} min={1} max={240} />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit"> Update quiz </Button>
                        </Form.Item>
                    </Form>
                    <Typography style={greenText}>{statusMessage}</Typography>
                </Card>
                <Divider>New Question</Divider>
                <Card className="newQuestion">
                    <Question question={{}} buttonText="Add question" adding addQuestion={addQuestion}></Question>
                </Card>
            </div>
            <Card className="questions">
                <Divider>Questions</Divider>
                {quiz.questions && quiz.questions.map((question, index) => {
                    return <Question key={question._id} question={question}
                        buttonText="Update question" index={index} deleteQuestion={deleteQuestion}></Question>
                })}
            </Card>
        </div>
    );
};
