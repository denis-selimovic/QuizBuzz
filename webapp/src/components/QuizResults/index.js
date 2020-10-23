import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "antd";
import { CSVLink } from "react-csv";
import axios from 'axios';
import { getBaseUrl } from "../../common/config";
import TOKEN from "../../token";

const fixed = [
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
    const [csvData, setCsvData] = useState([]);
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
        const fixedColumns = fixed.slice(0, 2);
        for (let i = 0; i < questions; ++i) {
            fixedColumns.push({ title: `Question ${i + 1}`, key: `question-${i + 1}`, dataIndex: `question-${i + 1}`, fixed: undefined, width: 80 });
            questionData[`question-${i + 1}`] = 0;
        }
        fixedColumns.push({ key: 'total', title: 'Total', fixed: 'right', width: 120, dataIndex: 'total' })
        const tableData = [];
        const tableCsv = [];
        results.forEach(r => {
            let total = 0;
            let i = 0;
            r.points.forEach(p => {
               total += p.amount;
               questionData[`question-${i + 1}`] = p.amount;
               ++i;
            });
            tableCsv.push({ name: r.name, surname: r.surname, ...questionData, total });
            tableData.push({ key: r.id, name: r.name, surname: r.surname, ...questionData, total });
        });
        setColumns(fixedColumns);
        setData(tableData);
        setCsvData(tableCsv);
    };

    useEffect(() => {
        async function asyncHook () {
            await fetchResults();
        }
        asyncHook();
    }, []);

    return (
        <React.Fragment>
            <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} style={{ width: 1200 }}/>
            <Button style={{ backgroundColor: 'green', color: 'white', border: '0 green' }}>
                <CSVLink data={csvData}>Export CSV</CSVLink>
            </Button>
        </React.Fragment>
    );
}
