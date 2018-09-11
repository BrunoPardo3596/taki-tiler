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
            role: '',
        }
    }

    editHandler = () => {
        localStorage.setItem("editId", this.state.id);
        this.props.history.push({ pathname: '/new-user' })
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
                <div className="GoBack">
                    <button onClick={this.props.history.goBack}>Go Back</button>
                </div>
                <div className="UserHeader">
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
                <div className="EditButton">
                    <button onClick={this.editHandler}>Edit</button>
                </div>
            </div>
        );
  }
}

export default UserInfo;