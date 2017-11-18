import React from 'react';
import Event from './Event.jsx';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="events" className="container">
        <Event/>
      </div>
    );
  }
};
