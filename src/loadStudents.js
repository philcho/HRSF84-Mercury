import React from 'react';
import ReactDOM from 'react-dom';
import Students from './components/Students.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Students/>,
    document.getElementById('students')
  )
});
