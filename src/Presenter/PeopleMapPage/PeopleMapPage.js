import React, { Component } from 'react';
import './PeopleMapPage.css';
import People from './PeopleList'
import ReactPaginate from 'react-paginate';
import User from '../../Domain/UserUseCases';
import UserRepository from '../../Data/UserRepository';

class PeopleMapPage extends Component {
  constructor(props){
    super(props)

    this.userRepo = UserRepository.Instance();
    this.user = User.Instance(this.userRepo);

    this.state = {
        perPage:3,
        people: [],
        offset: 0,
        pageCount: 0
    }
  }
  
  handlePageClick = (data) => {
    let selected = data.selected;

    this.setState({offset: selected}, () => {
      this.loadUsersFromServer();
    });
  };

  loadUsersFromServer() {
    this.user.getUserList(this.state.offset, this.state.perPage).then(response => this.setState({people: response}));
  }

  newUserHandler = () => {
    this.props.history.push({ pathname: '/new-user/0' });
  }

  componentDidMount(){
    this.user.getTotalUsers().then(response => this.setState({pageCount: response}));
    this.user.getUserList(0, this.state.perPage).then(response => this.setState({people: response}));
  }

  render(){

    let pageCount = this.state.pageCount/this.state.perPage;

    return(
        <div className="PersonList">
          <div className="ListHeader">
            <h1>Welcome {localStorage.getItem("name")}</h1>
          </div>
          <div>
            <fieldset>
              <legend>Taki Tiler user list</legend>
              <div className="PeopleBox">
                <People people={this.state.people} prop={this.props}></People>
                <ReactPaginate 
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={<a href="">...</a>}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
              </div>
            </fieldset>
          </div>
          <div>
            <fieldset>
              <legend>New User</legend>
              <p>For new user creation:</p>
              <button value="New User" onClick={this.newUserHandler}>Create</button>
            </fieldset>
          </div>
        </div>
    )
  }
}

export default PeopleMapPage;