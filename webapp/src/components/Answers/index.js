import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space, Switch, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default (props) => {
    const { oldAnswers, form } = props;

    useEffect(() => {
        oldAnswers.forEach(a => {
            let fieldsValue = {};
            fieldsValue[a._id] = {
                "correct": a.correct,
                "content": a.content
            }
            form.setFieldsValue(fieldsValue);
        });
    });

    return (
        <Form form={form}>
            <Form.Item>
                {oldAnswers.map(a => {
                    return <Space key={a._id} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item name={[a._id, "correct"]}>
                            <Switch checkedChildren="correct" unCheckedChildren="incorrect" defaultChecked={a.correct} />
                        </Form.Item>
                        <Form.Item name={[a._id, "content"]}>
                            <Input />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => oldAnswers.remove(a)} />
                    </Space>
                })}
            </Form.Item>
            <Form.List name="answers">
                {(answers, { add, remove }) => (
                    <>
                        {answers.map(field => (
                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'correct']}
                                    fieldKey={[field.fieldKey, 'correct']}
                                >
                                    <Switch checkedChildren="correct" unCheckedChildren="incorrect" defaultChecked />
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'content']}
                                    fieldKey={[field.fieldKey, 'content']}
                                    rules={[{ required: true, message: 'Missing answer' }]}
                                >
                                    <Input placeholder="Answer" />
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add answer
                             </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    )
}