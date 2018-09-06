import React from 'react';
import './PeopleMapPage.css'

const peopleList = (props) => {

    return(
    <div>
        {props.people.map(person => {
            return (
                <div className="Person" key={person.id} width="800px">
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
    )
}

export default peopleList