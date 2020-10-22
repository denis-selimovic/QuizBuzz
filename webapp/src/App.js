import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import QuizForm from "./components/QuizForm";
import Classrooms from "./components/Classrooms";


function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="dashboard" element={<Dashboard/>} >
            <Route path="" element={<Classrooms/>}/>
            <Route path="students" element={<StudentTable/>} />
            <Route path="student" element={<StudentForm/>} />
            <Route path="quiz" element={<QuizForm/>} />
          </Route>
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
