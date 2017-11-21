import React from 'react';
import ReactDOM from 'react-dom';
import Events from './components/Events.jsx';

document.addEventListener('DOMContentLoaded', () => {
  // load the template component on the template.html page
  ReactDOM.render(
    <Events/>,
    document.getElementById('events')
  )
});
