import React from "react";
import './classrooms.css'
import axios from 'axios';
import { Table, Button, Modal } from "antd";

import TOKEN from "../../token";



class Classrooms extends React.Component{

    state = {
        classrooms: [],
        tableData: [],
        visible: false,
        confirmLoading: false,
        ModalText: 'Send classroom code to all students?',
        record: null
    }

    columns = [
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
                <Button onClick={e => this.sendCode(text, record)} type="primary">Send code</Button>
            )
        },
        {
            dataIndex: 'list',
            key: 'list',
            render: (text, record) => (
                <Button type="primary">Student list</Button>
            )
        },
        {
            dataIndex: 'add',
            key: 'add',
            render: (text, record) => (
                <Button type="primary">Add student</Button>
            )
        },
        {
            dataIndex: 'quiz',
            key: 'quiz',
            render: (text, record) => (
                <Button type="primary">Create quiz</Button>
            )
        }
    ]

    async getClassrooms() {
        const response = await axios.get(`https://quiz-buzz-api.herokuapp.com/users/my-classrooms`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });
        this.setState({ classrooms: response.data });
        this.getClassroomData();
    }

    sendCode(text, record) {
        this.setState({ visible: true });
        this.setState({ record });
    }

    componentDidMount() {
        this.getClassrooms();
    }

    getClassroomData() {
        const data = [];
        this.state.classrooms.forEach(c => {
            data.push({ key: c._id, classroom: c.code.split('-')[0], code: c.code, students: c.students.length });
        })
        this.setState({ tableData: data })
    }

    cancelModal = () => {
        this.setState({ visible: false })
    }

    confirmModal = async () => {
        const { record } = this.state;
        await axios.post(`https://quiz-buzz-api.herokuapp.com/classrooms/${record.key}/send-code`, {}, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        })
        this.setState({ ModalText: 'Code successfully sent' });
        setTimeout(() => this.setState({ visible: false }), 2000);
    }

    render() {
        const { current } = this.props;
        if (current !== 'classroom') return null;
        const { visible, confirmLoading, ModalText, tableData } = this.state;
        return (
            <React.Fragment>
                <Table columns={this.columns} dataSource={tableData}/>
                <Modal visible={visible} confirmLoading={confirmLoading} onCancel={this.cancelModal} onOk={this.confirmModal}><p>{ModalText}</p></Modal>
            </React.Fragment>
        );
    }
};


export default Classrooms;
