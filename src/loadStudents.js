import React from 'react';
import ReactDOM from 'react-dom';
import Template from './template';

document.addEventListener('DOMContentLoaded', function () {
  // load the template component on the template.html page
  ReactDOM.render(
    <Students/>,
    document.getElementById('students')
  )
});
