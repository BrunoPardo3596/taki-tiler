import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Alert} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';

import Login from './Login/Login';
import PeopleList from './PeopleMapPage/PeopleMapPage';
import UserInfo from './UserInfo/UserInfo';
import NewUser from './NewUser/NewUser'


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      alert: false,
      content: '',
      color: 'primary',
    }

    this.onDismiss = this.onDismiss.bind(this);
  }

  setAlert = (color, alert, content) => {
    this.setState({
      alert: alert,
      color: color,
      content: content,
    })
  }

  onDismiss() {
    this.setState({ alert: false });
  }

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route 
              exact path="/" 
              render={(props) => <Login {...props} setAlert={this.setAlert} />}/>
            <Route path="/people-list" component={PeopleList}/>
            <Route path="/user-info" component={UserInfo}/>
            <Route 
              path="/new-user/:id" 
              render={(props) => <NewUser {...props} setAlert={this.setAlert} />}
            />
          </div>
        </Router>
        <Alert color={this.state.color} isOpen={this.state.alert} toggle={this.onDismiss}>{this.state.content}</Alert>
      </div>
    );
  }
}

export default App;