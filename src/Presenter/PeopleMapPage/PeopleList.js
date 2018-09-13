import React, { Component } from 'react';
import './PeopleMapPage.css';


class PeopleList extends Component {

    constructor(props){
        super(props)

        this.onUserClick = this.onUserClick.bind(this);
    }

    onUserClick = (id) => {
        localStorage.setItem("userId", id);
        this.props.prop.history.push({ pathname: '/user-info' });
    }

    render(){
        return(
            <div>
                {this.props.people.map(person => {
                    return (
                        <div className="Person" key={person.id} width="800px" onClick={() => this.onUserClick(person.id)}>
                            <div>
                                Id: {person.id}
                            </div>
                            <div>
                                Name: {person.name}
                            </div>
                            <div>
                                Role: {person.role}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default PeopleList