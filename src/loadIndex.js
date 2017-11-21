import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/Index.jsx';

document.addEventListener('DOMContentLoaded', () => {
  // load the template component on the template.html page
  ReactDOM.render(
    <Index/>,
    document.getElementById('index')
  )
});
