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
        allPeople: []
    }
  }

  
  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({offset: offset}, () => {
      this.loadCommentsFromServer();
    });
  };

  loadCommentsFromServer() {
    let data = this.state.allPeople.slice(this.state.offset, this.state.perPage + this.state.offset);
    this.setState({people: data});
  }

  componentDidMount(){
    axios.get("https://tq-template-server-sample.herokuapp.com/users?pagination={\"page\": 0 , \"window\": 10}",
        {headers: {Authorization: localStorage.getItem("token")}})
        .then(response => {
            this.setState({allPeople: response.data.data}),
            this.setState({people: response.data.data.slice(0, this.state.perPage)})
        });
  }

  render(){

    let pageCount = this.state.allPeople.length/this.state.perPage ;

    return(
        <div className="PersonList">
            <div className="ListHeader">
                <h1>Welcome {localStorage.getItem("name")}</h1>
            </div>
            <h2>Taki Tiler user list:</h2>
            <div className="PeopleBox">
                <People people={this.state.people}></People>
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
        </div>
    )
  }
}

export default PeopleMapPage;