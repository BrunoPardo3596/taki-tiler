import React, { Component } from 'react';
import './UserInfo.css';
import User from '../../Domain/UserUseCases';
import UserRepository from '../../Data/UserRepository';

class UserInfo extends Component {
    constructor(props){
        super(props)

        this.userRepo = UserRepository.Instance();
        this.user = User.Instance(this.userRepo);

        this.state = {
            id : 0,
            name: '',
            email: '',
            role: '',
        }
    }

    editHandler = () => {
        this.props.history.push({ pathname: `/new-user/${this.state.id}`});
    }

    componentDidMount(){
        this.setState({id: localStorage.getItem("userId")});
        this.user.getUserDetail(localStorage.getItem("userId")).then(response => {
            this.setState({
                email: response.email,
                name: response.name,
                role: response.role,
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