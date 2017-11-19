import React from 'react';
import Nav from './Nav.jsx';
import Event from './Event.jsx';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav/>

        <div className="events list container column">
          <h1>EVENTS</h1>

          <Event/>
          <Event/>
          <Event/>
        </div>
      </div>
    );
  }
};
