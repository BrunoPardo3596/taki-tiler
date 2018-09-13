import React, { Component } from 'react';
import './NewUser.css';
import User from '../../Domain/UserUseCases';
import ErrorMessage from '../ErrorMessage';

class NewUser extends Component {
  constructor(props) {
    super(props)

    this.user = User;

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
    const data = { ...this.state.data };
    data.email = email;
    const validateFormat = email.includes("@taqtile.com");
    this.setState({
      data: data,
      emailValid: validateFormat
    });
  }

  passwordChangedHandler = (event) => {
    const password = event.target.value;
    const data = { ...this.state.data };
    data.password = password;
    const regexLetters = RegExp('[A-Za-z]');
    const regexNumbers = RegExp('[0-9]');
    const validateFormat = (
      password.length >= 7 && 
      regexLetters.test(event.target.value) && 
      regexNumbers.test(event.target.value)
    );
    this.setState({
      data: data,
      passwordValid: validateFormat
    });
  }

  nameChangedHandler = (event) => {
    const name = event.target.value;
    const data = { ...this.state.data };
    data.name = name;
    const nameFormat = RegExp('[A-Za-z]*');
    const validateFormat = nameFormat.test(event.target.value);
    this.setState({
      data: data,
      nameValid: validateFormat
    });
  }

  roleChangedHandler = (event) => {
    const role = event.target.value;
    const data = { ...this.state.data };
    data.role = role;
    this.setState({ data: data });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.emailValid && this.state.passwordValid && this.state.nameValid) {
      document.body.style.cursor = 'wait';
      if (this.state.id === 0) {
        this.user.createUser(this.state.data).then(response => {
          if(response){
            document.body.style.cursor = 'default';
            this.props.setAlert("success", true, "User successfully created");
            this.props.history.goBack();
          } else{
            document.body.style.cursor = 'default'
            this.props.setAlert("danger", true, "Error creating user");
          }
        })
      } else {
        this.user.editUser(this.state.id, this.state.data).then(response => {
          if(response) {
            document.body.style.cursor = 'default';
            this.props.setAlert("success", true, "User successfully edited");
            this.props.history.goBack();
          } else {
            document.body.style.cursor = 'default'
            this.props.setAlert("danger", true, "Error editing user");
          }
        })
      }
    } else {
      this.props.setAlert("danger", true, "Fill the required infos");
    }
  }

  componentDidMount() {
    if (this.props.match.params.id !== "0") {
      this.user.getUserDetail(this.props.match.params.id).then(response => {
        const data = [...this.state.data]
        data.email = response.email;
        data.name = response.name;
        data.role = response.role;
        this.setState({
          data: data,
          id: this.props.match.params.id,
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
        <form onSubmit={this.onSubmitHandler}>
          <fieldset>
            <legend>Please fill the required fields</legend>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                required
                pattern="[A-Za-z]*"
                id="username"
                name="username"
                placeholder="Taki"
                title="Please enter a valid name"
                defaultValue={this.state.data.name}
                onChange={this.nameChangedHandler}
              />
              <ErrorMessage isValid={!this.state.nameValid} content="Name should contain only letters" />
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
              <ErrorMessage isValid={!this.state.emailValid} content="Please follow the pattern: @taqtile.com"/>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                disabled={this.props.match.params.id !== "0"}
                id="password"
                name="password"
                minLength="7"
                required
                placeholder="7 characters minimum"
                onChange={this.passwordChangedHandler} 
              />
              <ErrorMessage isValid={!this.state.passwordValid} content="Password must contain at least 7 characters(letters and numbers)"/>
            </div>
            <div>
              <label htmlFor="role">Role:</label>
              <select value={this.state.data.role} onChange={this.roleChangedHandler}>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>
            <button value="finish" onClick={this.onSubmitHandler}>Finish</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default NewUser;