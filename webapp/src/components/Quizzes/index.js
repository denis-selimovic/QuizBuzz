import React from "react";
import './quizzes.css';


export default props => {
    const { current } = props;
    if (current !== 'quiz') return null;
    return (
        <div>Quizzes</div>
    );
};
