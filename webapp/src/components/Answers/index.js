import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default (props) => {
    const { answers, setAnswers, form } = props;

    const onFinish = values => {
        console.log(values);
    }

    return (
        <Form form={form} onFinish={onFinish}>
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