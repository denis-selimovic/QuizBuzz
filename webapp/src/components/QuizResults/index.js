import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { getBaseUrl } from "../../common/config";
import TOKEN from "../../token";

const fixedColumns = [
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        fixed: 'left'
    },
    {
        title: 'Surname',
        key: 'surname',
        dataIndex: 'surname',
        fixed: 'left'
    },
    {
        title: 'Total',
        key: 'total',
        dataIndex: 'total',
        fixed: 'right'
    }
]

export default (props) => {

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState(fixedColumns);
    const { id } = useParams();

    const fetchResults = async () => {
        const response = await axios.get(`${getBaseUrl()}/quizzes/${id}/results`, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        })
        console.log(response.data.resultsPerStudents);
    };

    useEffect(() => {
        async function asyncHook () {
            await fetchResults();
        }
        asyncHook();
    }, []);

    return (
        <div>QuizResults</div>
    );
}
