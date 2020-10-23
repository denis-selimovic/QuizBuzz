import React, { useState, useEffect } from "react";
import './classrooms.css'
import axios from 'axios';
import { Table, Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";

import TOKEN from "../../token";
import { getBaseUrl } from "../../common/config";



const Classrooms = (props) => {

    const [tableData, setTableData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [ModalText, setModalText] = useState('Send classroom code to all students?');
    const [record, setRecord] = useState(null);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Classroom',
            dataIndex: 'classroom',
            key: 'classroom'
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: '# of students',
            dataIndex: 'students',
            key: 'students'
        },
        {
            dataIndex: 'scode',
            key: 'scode',
            render: (text, record) => (
                <Button onClick={e => sendCode(text, record)} type="primary">Send code</Button>
            )
        },
        {
            dataIndex: 'list',
            key: 'list',
            render: (text, record) => (
                <Button type="primary" onClick={e => navigate({ pathname: `${record.key}/students` })}>
                    Student list
                </Button>
            )
        },
        {
            dataIndex: 'add',
            key: 'add',
            render: (text, record) => (
                <Button type="primary">
                    <Link to={`${record.key}/student`}>Add student</Link>
                </Button>
            )
        },
        {
            dataIndex: 'quiz',
            key: 'quiz',
            render: (text, record) => (
                <Button type="primary">
                    <Link to={`${record.key}/quiz`}>Create quiz</Link>
                </Button>
            )
        }
    ]

    useEffect(() => {
        async function asyncHook() {
            await getClassrooms();
        }
        asyncHook();
    }, [])

    const getClassrooms = async () => {
        const response = await axios.get(`${getBaseUrl()}/users/my-classrooms`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });
        const classrooms = response.data;
        const data = [];
        classrooms.forEach(c => {
            data.push({ key: c._id, classroom: c.code.split('-')[0], code: c.code, students: c.students.length });
        })
        setTableData(data);
    }

    const sendCode = (text, record) => {
        setVisible(true);
        setRecord(record);
    }

    const cancelModal = () => {
        setVisible(false);
    }

    const confirmModal = async () => {
        await axios.post(`${getBaseUrl()}/classrooms/${record.key}/send-code`, {}, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        })
        setModalText('Code successfully sent');
        setTimeout(() => setVisible(false), 2000);
    }

    return (
        <div>
            <Table columns={columns} dataSource={tableData} />
            <Modal visible={visible} onCancel={cancelModal} onOk={confirmModal}><p>{ModalText}</p></Modal>
        </div>
    );
}


export default Classrooms;
