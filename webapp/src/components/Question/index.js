import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, DatePicker, Slider, Typography, InputNumber, Select, Collapse, Checkbox } from "antd";
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
        //values = createAnswers(values);
        if (props.adding) {
            await props.addQuestion(values, () => { form.resetFields(); answersForm.resetFields(); });
        } else {
            await updateQuestion(values);
        }
    }

    const createAnswers = (values) => {
        values["answers"] = answersForm.getFieldValue("answers").concat(question.answers);
        values.answers.forEach(a => {
            if (a.correct === undefined) {
                a["correct"] = true;
            }
            delete a._id;
        });
        return values;
    }

    const updateQuestion = async values => {
        console.log(answersForm.getFieldsValue());
        // try {
        //     const response = await axios.patch(`${getBaseUrl()}/questions/${question._id}`, values, {
        //         headers: {
        //             Authorization: `Bearer ${TOKEN}`
        //         }
        //     });
        //     setQuestion(response.data);
        //     setStatusMessage("Question successfully updated!");
        //     setTimeout(() => setStatusMessage(""), 2000);
        // } catch (e) {
        //     setStatusMessage("Something went wrong!");
        // }
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
                        <Answers form={answersForm} oldAnswers={question.answers}></Answers>
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
