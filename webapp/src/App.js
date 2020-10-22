import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { ProtectedRoute } from "./auth/ProtectedRoute"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={(props) => <Login {...props}></Login>} />
          <Route path="/login" render={(props) => <Login {...props}></Login>} />
          <Route path="/register" render={(props) => <Register {...props}></Register>} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
