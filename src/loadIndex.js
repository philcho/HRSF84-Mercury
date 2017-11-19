import React from 'react';
import ReactDOM from 'react-dom';
import Template from './index.js';

document.addEventListener('DOMContentLoaded', function () {
  // load the template component on the template.html page
  ReactDOM.render(
    <Index/>,
    document.getElementById('index')
  )
});
