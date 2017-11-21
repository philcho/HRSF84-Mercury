import React from 'react';
import ReactDOM from 'react-dom';
import Students from './components/Students.jsx';

document.addEventListener('DOMContentLoaded', () => {
  // load the template component on the template.html page
  ReactDOM.render(
    <Students/>,
    document.getElementById('students')
  )
});
