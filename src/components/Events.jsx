import React from 'react';
import axios from 'axios';
import Nav from './Nav.jsx';
import Event from './Event.jsx';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  getAllEvents() {
    axios.get('/getAllEvents')
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch((error) => {
        console.log(`----- getAllEvents error : ${error} -----`);
      });
  }

  componentDidMount() {
    this.getAllEvents();
  }

  render() {
    return (
      <div>
        <Nav/>

        <div className="events list container column">
          <div className="title-page">EVENTS</div>

          <div className="container column">
            {this.state.events.map((event, index) => {
              return (<Event event={event} key={event._id}/>);
            })}
          </div>
        </div>
      </div>
    );
  }
};

