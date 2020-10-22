import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import { ProtectedRoute } from "./auth/ProtectedRoute"

function App() {
  return (
    <div className="container">
      <Router>
          <Switch>
            <Route path="/" exact render={(props) => <Login {...props}/>} />
            <Route path="/login" render={(props) => <Login {...props}/>} />
            <Route path="/register" render={(props) => <Register {...props}/>} />
            <Route path="/dashboard" exact render={(props) => <Dashboard {...props}/>} />
            <Route path="/students" exact render={(props) => <StudentTable {...props}/>} />
              <Route path="/student" exact render={(props) => <StudentForm {...props}/>} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
