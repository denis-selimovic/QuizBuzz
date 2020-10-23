import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from 'axios';


import TOKEN from "../../token";
import { useLocation, useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../common/config";

const StudentTable = (props) => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            dataIndex: 'scode',
            key: 'scode',
            render: (text, record) => (
                <Button type="primary" onClick={() => {
                    setVisible(true);
                    setStudent(record.key);
                }} >Send classroom code</Button>
            )
        }
    ];

    const location = useLocation();
    const [tableData, setTableData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [ModalText, setModalText] = useState('Send classroom code to student?');
    const [classroom, setClassroom] = useState(location.pathname.split('/')[2]);
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    const fetchStudents = async () => {
        console.log(classroom);
        const response = await axios.get(`${getBaseUrl()}/classrooms/${classroom}/students`, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        })
        const students = response.data;
        const data = [];
        students.forEach(s => {
            data.push({ key: s._id, name: s.name, surname: s.surname, email: s.email });
        });
        setTableData(data);
    }

    useEffect(() => {
        async function asyncHook() {
            await fetchStudents();
        }
        asyncHook();
    }, []);


    const sendCode = async id => {
        await axios.post(`${getBaseUrl()}/classrooms/${classroom}/send-code/${student}`, {}, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        })
        setModalText('Code successfully sent');
        setTimeout(() => setVisible(false), 2000);
    }

    return (
        <React.Fragment>
            <Table columns={columns} dataSource={tableData} />
            <Modal visible={visible} onOk={sendCode} onCancel={() => setVisible(false)} ><p>{ModalText}</p></Modal>
        </React.Fragment>
    );
}

export default StudentTable;
