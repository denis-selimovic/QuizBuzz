import React from "react";
import './classrooms.css'

export default props => {
    const { current } = props;
    if (current !== 'classroom') return null;
    return (
        <div>Classrooms</div>
    );
};
