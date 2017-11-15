import React from 'react';
import ReactDOM from 'react-dom';
import Template from './Template';

document.addEventListener('DOMContentLoaded', function () {
  // load the template component on the template.html page
  ReactDOM.render(
    React.createElement(Template),
    document.getElementById('template')
  )
});
