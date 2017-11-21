import React from 'react';
import ReactDOM from 'react-dom';
import Template from './components/template.jsx';

document.addEventListener('DOMContentLoaded', () => {
  // load the template component on the template.html page
  ReactDOM.render(
    <Template/>,
    document.getElementById('template')
  )
});
