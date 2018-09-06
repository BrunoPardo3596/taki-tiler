import React, { Component } from 'react';
import './PersonList.css';

class PersonList extends Component {
  constructor(props){
    super(props)

    this.state = {
        persons: [
            {id: 1, name: "Bruno", age: 22},
            {id: 2, name: "Taki", age: 3},
            {id: 3, name: "X", age: 40},
        ]
    }
  }

  render(){
      return(
        <div className="PersonList">
            <div className="ListHeader">
                <h1>Welcome {localStorage.getItem("name")}</h1>
            </div>
            <h2>Taki Tiler user list:</h2>
            {this.state.persons.map(person => {
                return (
                    <div className="Person" key={person.id} width="800px">
                        <div>
                            Id: {person.id}
                        </div>
                        <div>
                            Name: {person.name}
                        </div>
                        <div>
                            Age: {person.name}
                        </div>
                    </div>
                )
            })}
        </div>
      )
  }
}

export default PersonList;