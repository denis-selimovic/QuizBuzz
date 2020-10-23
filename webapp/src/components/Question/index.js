import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Typography, InputNumber, Select, Collapse } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from 'axios';
import { getBaseUrl } from "../../common/config";
import TOKEN from "../../token";
import Answers from "../Answers";

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
    const [question, setQuestion] = useState(props.question);
    const [form] = useForm();
    const [answersForm] = useForm();
    const [statusMessage, setStatusMessage] = useState();

    useEffect(() => {
        if (props.adding) {
            question["answers"] = [];
            return;
        }
        form.setFieldsValue({
            text: question.text,
            points: question.points,
            scoringSystem: question.scoringSystem
        });
    }, [question]);

    const onFinish = async values => {
        let data = createAnswers(values);
        if (data === null) return;
        if (props.adding) {
            await props.addQuestion(values, () => { form.resetFields(); answersForm.resetFields(); });
        } else {
            await updateQuestion(values);
        }
    }

    const createAnswers = (values) => {
        let answers = [];
        let newAnswers = answersForm.getFieldValue("answers");
        let oldAnswers = answersForm.getFieldsValue();
        let invalid = false;
        let hasCorrect = false;

        if (newAnswers) {
            answers = answers.concat(newAnswers);
        }

        if (Object.keys(oldAnswers).length === 0) {
            question.answers.forEach(answer => {
                delete answer._id;
                answers.push(answer);
            });
        } else {
            Object.keys(oldAnswers).forEach(key => {
                if (key !== "answers") {
                    answers.push(oldAnswers[key]);
                }
            });
        }

        answers.forEach(answer => {
            if (!answer || !answer.content || answer.content === "") {
                invalid = true;
                return;
            }

            if (answer.correct === undefined) {
                answer.correct = true;
            }

            if (answer.correct) {
                hasCorrect = true;
            }
        })

        if (invalid && !hasCorrect) {
            setStatusMessage("Answer can't be blank and question must contain one correct answer at all times");
            setTimeout(() => setStatusMessage(""), 3000);
        } else if (invalid) {
            setStatusMessage("Answer can't be blank");
            setTimeout(() => setStatusMessage(""), 2000);
        } else if (!hasCorrect) {
            setStatusMessage("Question must contain one correct answer at all times");
            setTimeout(() => setStatusMessage(""), 2000);
        } else {
            values["answers"] = answers;
            return values;
        }

        return null;
    }

    const updateQuestion = async values => {
        try {
            const response = await axios.patch(`${getBaseUrl()}/questions/${question._id}`, values, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            });
            setQuestion(response.data);
            setStatusMessage("Question successfully updated!");
        } catch (e) {
            setStatusMessage("Something went wrong!");
        }
        setTimeout(() => setStatusMessage(""), 2000);
    }

    const removeAnswer = async answerId => {
        try {
            const response = await axios.delete(`${getBaseUrl()}/questions/${question._id}/answer/${answerId}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            });
            setQuestion(response.data);
        } catch (e) {
            setStatusMessage("Something went wrong!");
        }
        setTimeout(() => setStatusMessage(""), 2000);
    }

    return (
        <Collapse bordered={false}>
            <Collapse.Panel header={!props.adding && `Question ${props.index + 1}`}>
                <Card>
                    <Form form={form} {...formItemLayout}
                        onFinish={onFinish}>
                        <Form.Item label="Text" name="text"
                            rules={[{ required: true, message: 'Please input the text of the question!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Points" name="points"
                            rules={[{ required: true, message: 'Please input the number of points!' }]}>
                            <InputNumber min={0}></InputNumber>
                        </Form.Item>
                        <Form.Item label="Scoring system" name="scoringSystem"
                            rules={[{ required: true, message: 'Please choose the scoring system' }]}>
                            <Select>
                                <Select.Option value={0}>Binary scoring</Select.Option >
                                <Select.Option value={1}>Partial scoring</Select.Option >
                                <Select.Option value={2}>Partial scoring with negative points</Select.Option >
                            </Select>
                        </Form.Item>
                        <Form.Item label="Answers">
                            <Collapse>
                                <Collapse.Panel header="Answers">
                                    <Answers form={answersForm} oldAnswers={question.answers} removeAnswer={removeAnswer}></Answers>
                                </Collapse.Panel>
                            </Collapse>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit"> {props.buttonText} </Button>
                        </Form.Item>
                        <Typography>{statusMessage}</Typography>
                    </Form>
                </Card>
            </Collapse.Panel>
        </Collapse>
    );
}
