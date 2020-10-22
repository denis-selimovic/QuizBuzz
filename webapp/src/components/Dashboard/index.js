import React from "react";
import './dashboard.css'
import { Menu } from "antd";

const { Item } = Menu;

const menuStyle = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '16px'
}

class Dashboard extends React.Component {

    state = {
        current: 'classroom'
    }

    constructor(props) {
        super(props);
    }

    handleClick = e => {
        this.setState({ current: e.key });
    }

    render() {
        return (
            <div className="dashboard">
                <div className="header">
                    <div className="left-menu">
                        <Menu selectedKeys={[this.state.current]} onClick={this.handleClick} mode={`horizontal`} theme={`dark`} style={menuStyle}>
                            <Item key={`classroom`}>Classrooms</Item>
                            <Item key={`quiz`}>Quizzes</Item>
                        </Menu>
                    </div>
                    <div className="right-menu">
                        <div className="item">
                            Classrooms
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
