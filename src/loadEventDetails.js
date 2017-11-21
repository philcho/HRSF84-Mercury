import React from 'react';
import ReactDOM from 'react-dom';
import EventDetails from './components/EventDetails.jsx';

document.addEventListener('DOMContentLoaded', () => {
  // load the event details component on the event-details.html page
  ReactDOM.render(
    <EventDetails/>,
    document.getElementById('event-details')
  )
});
