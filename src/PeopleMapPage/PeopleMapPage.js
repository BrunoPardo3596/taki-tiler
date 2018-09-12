import React, { Component } from 'react';
import './PeopleMapPage.css';
import People from './PeopleList'
import ReactPaginate from 'react-paginate';
import axios from 'axios';

class PeopleMapPage extends Component {
  constructor(props){
    super(props)

    this.state = {
        perPage:3,
        people: [],
        offset: 0,
        pageCount: 0
    }
  }
  
  handlePageClick = (data) => {
    let selected = data.selected;
    //let offset = Math.ceil(selected * this.state.perPage);

    this.setState({offset: selected}, () => {
      this.loadCommentsFromServer();
    });
  };

  loadCommentsFromServer() {
    //let data = this.state.allPeople.slice(this.state.offset, this.state.perPage + this.state.offset);
    axios.get("https://tq-template-server-sample.herokuapp.com/users?pagination={\"page\":" + this.state.offset +", \"window\": 3}",
    {headers: {Authorization: localStorage.getItem("token")}})
    .then(response => {
      this.setState({people: response.data.data});
    })
    
  }

  newUserHandler = () => {
    this.props.history.push({ pathname: '/new-user/0' });
  }

  componentDidMount(){
    axios.get("https://tq-template-server-sample.herokuapp.com/users",
        {headers: {Authorization: localStorage.getItem("token")}})
        .then(response => {
          this.setState({pageCount: response.data.pagination.total})
        });
    axios.get("https://tq-template-server-sample.herokuapp.com/users?pagination={\"page\": 0 , \"window\": 3}",
        {headers: {Authorization: localStorage.getItem("token")}})
        .then(response => {
          this.setState({people: response.data.data})
        });
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