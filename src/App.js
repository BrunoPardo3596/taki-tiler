import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './Login/Login';
import PeopleList from './PeopleMapPage/PeopleMapPage';
import UserInfo from './UserInfo/UserInfo';
import NewUser from './NewUser/NewUser'


class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login}/>
          <Route path="/people-list" component={PeopleList}/>
          <Route path="/user-info" component={UserInfo}/>
          <Route path="/new-user" component={NewUser}/>
        </div>
      </Router>
    );
  }
}

export default App;