import React, { Component } from 'react';
import './UserInfo.css';
import axios from 'axios';

class UserInfo extends Component {
    constructor(props){
        super(props)

        this.state = {
            id : 0,
            name: '',
            email: '',
            role: ''
        }
    }

    componentDidMount(){
        this.setState({id: localStorage.getItem("userId")});
        axios.get('https://tq-template-server-sample.herokuapp.com/users/' + localStorage.getItem("userId"),
        {headers: {Authorization: localStorage.getItem("token")}})
        .then(response => {
            this.setState({
                email: response.data.data.email,
                name: response.data.data.name,
                role: response.data.data.role
            });
        })
    }

  render() {

    return (
        <div className="UserInfo">
            <div className="UserHeader">
                <button onClick={this.props.history.goBack}>Go Back</button>
                <h1>Description page {this.state.name}</h1>
            </div>
            <div className="User"width="800px">
                Name: {this.state.name}
            </div>
            <div className="User"width="800px">
                Role: {this.state.role}
            </div>
            <div className="User"width="800px">
                Email: {this.state.email}
            </div>
        </div>
    );
  }
}

export default UserInfo;