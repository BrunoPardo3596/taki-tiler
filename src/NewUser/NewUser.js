import React, { Component } from 'react';
import './NewUser.css';
import axios from 'axios';

class NewUser extends Component {
  constructor(props){
    super(props)

    this.state = {
      emailValid: false,
      passwordValid: false,
      nameValid: false,
      id: 0,
      data: {
        name: '',
        password: '',
        email: '',
        role: 'admin',
      },
    }
  
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  emailChangedHandler = (event) => {
    const email = event.target.value;
    const data = {...this.state.data};
    data.email = email;
    const validateFormat = email.includes("@taqtile.com");
    this.setState({
      data : data,
      emailValid: validateFormat
    });
  }

  passwordChangedHandler = (event) => {
    const password = event.target.value;
    const data = {...this.state.data};
    data.password = password;
    const validateFormat = password.length >= 4;
    this.setState({
      data: data,
      passwordValid: validateFormat
    });
  }

  nameChangedHandler = (event) => {
    const name = event.target.value;
    const data = {...this.state.data};
    data.name = name;
    const nameFormat = RegExp('[A-Z][a-z]*');
    const validateFormat = nameFormat.test(event.target.value);
    this.setState({
      data: data,
      nameValid: validateFormat
    });
  }

  roleChangedHandler = (event) => {
    const role = event.target.value;
    const data = {...this.state.data};
    data.role = role;
    this.setState({data: data});
  }

  onSubmitHandler = () => {
    if(this.state.emailValid && this.state.passwordValid && this.state.nameValid){
      document.body.style.cursor='wait';
      if(this.state.id === 0){
        axios.post('https://tq-template-server-sample.herokuapp.com/users', this.state.data,
        {headers: {Authorization: localStorage.getItem("token")}})
          .then(response => {
            document.body.style.cursor='default';
            alert("User successfully created");
            this.props.history.goBack();
          })
          .catch((err) => {
            document.body.style.cursor='default'
            alert(err);
          });
      } else {
        axios.put('https://tq-template-server-sample.herokuapp.com/users/' + this.state.id, this.state.data,
        {headers: {Authorization: localStorage.getItem("token")}})
          .then(response => {
            document.body.style.cursor='default';
            alert("User successfully edited");
            this.props.history.goBack();
          })
          .catch((err) => {
            document.body.style.cursor='default'
            alert(err);
          });
      }
    } else {
      console.log(this.state);
    }
  }

  componentDidMount(){
    if(localStorage.getItem("editId") !== "0"){
      axios.get('https://tq-template-server-sample.herokuapp.com/users/' + localStorage.getItem("editId"),
        {headers: {Authorization: localStorage.getItem("token")}})
        .then(response => {
          const data = [...this.state.data]
          data.email = response.data.data.email;
          data.name = response.data.data.name;
          data.role = response.data.data.role;
          this.setState({
            data: data,
            id: localStorage.getItem("editId"),
            emailValid: true,
            nameValid: true,
            passwordValid: true,
          });
        })
    }
  }

  render() {

    return (
      <div className="NewUser">
        <div className="GoBack">
          <button onClick={this.props.history.goBack}>Go Back</button>
        </div>
        <div className="UserHeader">
          <h1>New Taki-Tiler User</h1>
        </div>
        <fieldset>
          <legend>Please fill the required fields</legend>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text" 
              required 
              pattern="[A-Z][a-z]*"
              id="username" 
              name="username" 
              placeholder="Taki"
              title="Please enter a valid name"
              defaultValue={this.state.data.name}
              onChange={this.nameChangedHandler}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email" 
              required 
              pattern=".+@taqtile.com"
              id="email" 
              name="email" 
              placeholder="Taki@taqtile.com"
              title="Please enter a valid email"
              defaultValue={this.state.data.email}
              onChange={this.emailChangedHandler}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              disabled={localStorage.getItem("editId") !== "0"}
              id="password" 
              name="password"
              minLength="4"  
              required title="Password must contain at least 4 characters"
              placeholder="4 characters minimum" 
              onBlur={this.passwordChangedHandler}/>
          </div>
          <div>
            <label htmlFor="role">Role:</label>
            <select defaultValue={this.state.data.role} onChange={this.roleChangedHandler}>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
          <button value="finish" onClick={this.onSubmitHandler}>Finish</button>
        </fieldset>
      </div>
    );
  }
}

export default NewUser;