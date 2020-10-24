import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "antd";
import axios from 'axios';
import { getBaseUrl } from "../../common/config";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../../auth/utils";
import AddStudent from '../AddStudent';

export default (props) => {

    const columns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Surname',
            key: 'surname',
            dataIndex: 'surname'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'Code',
            key: 'code',
            dataIndex: 'code'
        },
        {
            key: 'gcode',
            dataIndex: 'gcode',
            render: (text, record) => (
                <Button type="primary" onClick={() => showGenerateCode(record)}>Generate code</Button>
            )
        },
        {
            key: 'scode',
            dataIndex: 'scode',
            render: (text, record) => (
                <Button type="primary" onClick={() => showSendCode(record)}>Send code</Button>
            )
        }
    ]


    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');
    const [record, setRecord] = useState(null);
    const [type, setType] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function hook() {
            await fetchStudents();
        }
        hook();
    }, [])

    const fetchStudents = async () => {
        const response = await axios.get(`${getBaseUrl()}/quizzes/${id}/students`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        const students = response.data;
        console.log(students);
        const tableData = [];
        students.forEach(s => tableData.push({ key: s.id, name: s.name, surname: s.surname, email: s.email, code: s.code }));
        setData(tableData)
    }

    const sendCode = async () => {
        try {
            await axios.post(`${getBaseUrl()}/quizzes/${id}/send-code/${record.key}`, {}, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setText('Code successfully sent');
        } catch (e) {
            setText('Could not send code');
        }
        setTimeout(closeModal, 2000);
    }

    const generateCode = async () => {
        try {
            await axios.post(`${getBaseUrl()}/quizzes/${id}/generate-code/${record.key}`, {}, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setText('Code successfully generated');
            navigate(`/dashboard/quizzes`);
        } catch (e) {
            setText('Could not generate new code');
        }
        setTimeout(closeModal, 2000);
    }

    const showSendCode = record => {
        setVisible(true)
        setRecord(record);
        setType(2);
        setText('Send quiz code to student?');
    }

    const showGenerateCode = record => {
        setVisible(true)
        setRecord(record);
        setType(1);
        setText('Generate new code for student?');
    }

    const closeModal = () => {
        setVisible(false);
        setText('');
        setRecord(null);
        setType(0);
    }

    const onOk = () => {
        if (type === 0) return closeModal();
        if (type === 1) generateCode();
        if (type === 2) sendCode();
    }

    const onSubmit = student => {
        const tableData = [ ...data, student ];
        setData(tableData);
    };

    return (
        <React.Fragment>
            <AddStudent id={id} onSubmit={onSubmit}/>
            <Table dataSource={data} columns={columns} />
            <Modal visible={visible} onOk={onOk} onCancel={closeModal}><p>{text}</p></Modal>
        </React.Fragment>
    );
}
