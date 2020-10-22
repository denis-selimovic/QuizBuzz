import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { ProtectedRoute } from "./auth/ProtectedRoute"

function App() {
  return (
    <div className="container">
      <Router>
<<<<<<< HEAD
        <Switch>
          <Route path="/" exact render={(props) => <Login {...props} />} />
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/register" exact render={(props) => <Register {...props} />} />
          <Route path="/dashboard" exact render={(props) => <Dashboard {...props} />} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
=======
          <Switch>
            <Route path="/" exact render={(props) => <Login {...props}/>} />
            <Route path="/login" render={(props) => <Login {...props}/>} />
            <Route path="/register" render={(props) => <Register {...props}/>} />
            <Route path="/dashboard" exact render={(props) => <Dashboard {...props}/>} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
>>>>>>> 925491de88d00801347950a08669d147ca6dac2b
      </Router>
    </div>
  );
}

export default App;
