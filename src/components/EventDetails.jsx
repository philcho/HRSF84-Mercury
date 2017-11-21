import React from 'react';
import axios from 'axios';

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventDetailsData: {}
    }
  }

  getEventDetailsData() {
    // Example URL: http://localhost:3000/event/5a0ddac3b218d0cadf73eefb
    let eventId = window.location.href.split('/event/')[1];
    console.log('eventId', eventId);

    axios.post('/getParticularEvent', {
      eventInfo: {
        _id: eventId
      }
    })
    .then((response) => {
      this.setState({ eventDetailsData: response.data[0] });
    }.bind(this))
    .catch((error) => {
      console.log('getEventDetailsData error', error);
    });
  }

  render() {
    return (
      <div>
        <ul>
          <li>name: {this.state.eventDetailsData.name}</li>
          <li>date: {this.state.eventDetailsData.date}</li>
          <li>picture: {this.state.eventDetailsData.picture}</li>
          <li>description: {this.state.eventDetailsData.description}</li>
        </ul>

        <div>
          {/* TODO: Add Comment Form */}
          comments:
          <ol>
            {/* TODO: Add Comments Component */}
          </ol>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getEventDetailsData();
  }
}
