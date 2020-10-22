import React from "react";
import {Table, Button, Modal} from "antd";
import axios from 'axios';

import TOKEN from "../../token";

class StudentTable extends React.Component {

    columns = [
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
                <Button type="primary" onClick={() => this.setState({ visible: true, record: record })} >Send classroom code</Button>
            )
        }
    ];

    state = {
        tableData: [],
        visible: false,
        ModalText: 'Send classroom code to student?',
        record: null
    }

    componentDidMount() {
        this.fetchStudents();
    }

    fetchStudents = async () => {
        const { location } = this.props;
        const { state } = location;
        const { record } = state;
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/classrooms/${record.key}/students`, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        })
        const students = response.data;
        const data = [];
        students.forEach(s => {
            data.push({ key: s._id, name: s.name, surname: s.surname, email: s.email });
        });
        this.setState({ tableData: data });
    }

    sendCode = async () => {
        const { record } = this.state;
        if (!record) {
            this.setState({ visible: false });
            return;
        }
        await axios.post(`${process.env.REACT_APP_BASE_URL}/classrooms/${this.props.location.state.record.key}/send-code/${record.key}`, {}, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        })
        this.setState({ ModalText: 'Code successfully sent' });
        setTimeout(() => this.setState({ visible: false }), 2000);
    }

    render() {
        const { tableData, ModalText, visible } = this.state;
        return (
            <React.Fragment>
                <Table columns={this.columns} dataSource={tableData}/>
                <Modal visible={visible} onOk={this.sendCode} onCancel={() => this.setState({ visible: false })} ><p>{ModalText}</p></Modal>
            </React.Fragment>
        );
    }
}

export default StudentTable;
