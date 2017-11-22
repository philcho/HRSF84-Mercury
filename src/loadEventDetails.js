import React from 'react';
import ReactDOM from 'react-dom';
import EventDetails from './components/EventDetails.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <EventDetails/>,
    document.getElementById('event-details')
  )
});
