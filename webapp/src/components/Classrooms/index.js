import React from "react";
import './classrooms.css'
import axios from 'axios';

class Classrooms extends React.Component{

    state = {
        classrooms: []
    }


    componentDidMount() {

    }

    render() {
        const { current } = this.props;
        if (current !== 'classroom') return null;
        return (
            <div>Classrooms</div>
        );
    }
};


export default Classrooms;
