import React from 'react';
import axios from 'axios';
import Comments from './Comments.jsx';

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventDetailsData: {}
    }
  }

  componentDidMount() {
    this.getEventDetailsData();
  }

  getEventDetailsData() {
    // Example URL: http://localhost:3000/event/5a0ddac3b218d0cadf73eefb
    let eventId = window.location.href.split('/event/')[1];

    axios.post('/getParticularEvent', {
      eventInfo: {
        _id: eventId
      }
    })
    .then((response) => {
      if (response.data[0]) {
        this.setState({ eventDetailsData: response.data[0] });
      }
    })
    .catch((error) => {
      console.log('getEventDetailsData error', error);
    });
  }

  render() {
    return (
      <div className="event-details container column">
        <Nav/>

        <div className="event-details-info container column">
          <div className="event-picture">{this.state.eventDetailsData.picture}</div>

          <div className="container column">
            <div className="event-name">{this.state.eventDetailsData.name}</div>
            <div className="event-date">{this.state.eventDetailsData.date}</div>
            <div className="event-decript">{this.state.eventDetailsData.description}</div>
          </div>
        </div>

        <CommentForm/>

        <Comments/>
      </div>
    );
  }
};
