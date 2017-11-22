import React from 'react';
import ReactDOM from 'react-dom';
import Events from './components/Events.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Events/>,
    document.getElementById('events')
  )
});
