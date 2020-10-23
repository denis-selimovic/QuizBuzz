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
import Quizzes from './components/Quizzes'
import QuizEdit from './components/QuizEddit';
import QuizResults from './components/QuizResults';
import QuizStudentTable from './components/QuizStudentTable';


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
            <Route path=":id/students" element={<StudentTable/>} />
            <Route path=":id/student" element={<StudentForm/>} />
            <Route path=":id/quiz" element={<QuizForm/>} />
            <Route path="quizzes" element={<Quizzes/>}/>
            <Route path=":id/quiz-students" element={<QuizStudentTable/>}/>
            <Route path=":id/quiz-results" element={<QuizResults/>}/>
            <Route path=":id/quiz-edit" element={<QuizEdit/>}/>
          </Route>
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
