import React from 'react';
import ReactDOM from 'react-dom';
import EventDetails from './components/Shoutouts.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Shoutouts/>,
    document.getElementById('event-details')
  )
});
