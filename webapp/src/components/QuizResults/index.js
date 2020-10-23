import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import axios from 'axios';
import { getBaseUrl } from "../../common/config";
import TOKEN from "../../token";

const fixedColumns = [
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        fixed: 'left',
        width: 120
    },
    {
        title: 'Surname',
        key: 'surname',
        dataIndex: 'surname',
        fixed: 'left',
        width: 120
    }
]

export default (props) => {

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const { id } = useParams();

    const fetchResults = async () => {
        const response = await axios.get(`${getBaseUrl()}/quizzes/${id}/results`, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        })
        const { results, questions } = response.data;
        const questionData = {};
        for (let i = 0; i < questions; ++i) {
            fixedColumns.push({ title: `Question ${i + 1}`, key: `question-${i + 1}`, dataIndex: `question-${i + 1}`, fixed: undefined, width: 120 });
            questionData[`question-${i + 1}`] = 0;
        }
        fixedColumns.push({ key: 'total', title: 'Total', fixed: 'right', width: 120, dataIndex: 'total' })
        const tableData = [];
        results.forEach(r => {
            let total = 0;
            let i = 0;
            r.points.forEach(p => {
               total += p.amount;
               questionData[`question-${i + 1}`] = p.amount;
               ++i;
            });
            tableData.push({ ...questionData, key: r._id, name: 'Denis', surname: 'Selimovic', total });
        });
        setColumns(fixedColumns);
        setData(tableData);
    };

    useEffect(() => {
        async function asyncHook () {
            await fetchResults();
        }
        asyncHook();
    }, []);

    return (
        <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} style={{ width: 1200 }}/>
    );
}
