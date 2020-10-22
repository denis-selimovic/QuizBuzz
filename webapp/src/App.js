import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Classrooms from './components/Classrooms';
import Login from './components/Login';
import Register from './components/Login';
import { ProtectedRoute } from "./auth/ProtectedRoute"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={(props) => <Login {...props}></Login>} />
          <Route path="/login" render={(props) => <Login {...props}></Login>} />
          <Route path="/register" render={(props) => <Register {...props}></Register>} />
          <ProtectedRoute path="/classrooms" exact component={Classrooms} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
