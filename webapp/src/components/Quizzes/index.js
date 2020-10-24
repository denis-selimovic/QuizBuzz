import React, { useState, useEffect } from "react";
import './quizzes.css';
import { Button, Modal, Table } from "antd";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';
import { getToken } from "../../auth/utils";

export default props => {

    const [tableData, setTableData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [ModalText, setModalText] = useState('Send quiz code to all students?');
    const [record, setRecord] = useState(null);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: '# of students',
            key: 'num',
            dataIndex: 'num'
        },
        {
            title: 'Date',
            key: 'date',
            dataIndex: 'date'
        },
        {
            title: 'Duration',
            key: 'duration',
            dataIndex: 'duration'
        },
        {
            key: 'scode',
            dataIndex: 'scode',
            render: (text, record) => (
                <Button type="primary" onClick={() => {
                    setVisible(true);
                    setRecord(record);
                }}>Send code</Button>
            )
        },
        {
            key: 'students',
            dataIndex: 'students',
            render: (text, record) => (
                <Button type="primary" onClick={() => navigate(`/dashboard/${record.key}/quiz-students`)}>Students</Button>
            )
        },
        {
            key: 'edit',
            dataIndex: 'edit',
            render: (text, record) => (
                <Button type="primary" onClick={() => navigate(`/dashboard/${record.key}/quiz-edit`)}>Edit</Button>
            )
        },
        {
            key: 'results',
            dataIndex: 'results',
            render: (text, record) => (
                <Button type="primary" onClick={() => navigate(`/dashboard/${record.key}/quiz-results`)}>Results</Button>
            )
        },
        {
            key: 'delete',
            dataIndex: 'delete',
            render: (text, record) => (
                <DeleteOutlined onClick={() => deleteQuiz(record.key)} />
            )
        }
    ];

    useEffect(() => {
        async function asyncHook() {
            await fetchQuizzes();
        }
        asyncHook();
    }, []);

    const fetchQuizzes = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/my-quizzes`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        const quizzes = response.data;
        const data = [];
        quizzes.forEach(q => {
            data.push({ key: q._id, name: q.name, num: q.students.length, date: q.date, duration: q.duration });
        });
        setTableData(data);
    }

    const cancelModal = () => {
        setVisible(false);
        setRecord(null);
    }

    const deleteQuiz = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/quizzes/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        await fetchQuizzes();
    }

    const confirmModal = async () => {
        if (!record) return setVisible(false);
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/quizzes/${record.key}/send-code`, {}, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setModalText('Code successfully sent');
        } catch (e) {
            setModalText('Code could not be sent');
        }
        setTimeout(cancelModal, 2000);
    }

    return (
        <React.Fragment>
            <Table columns={columns} dataSource={tableData} />
            <Modal visible={visible} onCancel={cancelModal} onOk={confirmModal}><p>{ModalText}</p></Modal>
        </React.Fragment>
    );
};
