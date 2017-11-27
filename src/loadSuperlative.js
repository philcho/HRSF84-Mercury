import React from 'react';
import ReactDOM from 'react-dom';
import Superlative from './components/Superlative.jsx';
import Nav from './components/Nav.jsx';

document.addEventListener('DOMContentLoaded', () => {
  // load the superlative component on the superlative.html page
  ReactDOM.render(
    <Superlative />,
    document.getElementById('superlative')
  );

  ReactDOM.render(
    <Nav />,
    document.getElementById('nav')
  );
});
