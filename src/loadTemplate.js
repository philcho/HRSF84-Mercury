import React from 'react';
import ReactDOM from 'react-dom';
import Template from './components/Template.jsx';

document.addEventListener('DOMContentLoaded', function () {
  // load the template component on the template.html page
  ReactDOM.render(
    <Template/>,
    document.getElementById('template')
  )
});
