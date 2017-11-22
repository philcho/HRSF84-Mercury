import React from 'react';
import ReactDOM from 'react-dom';
import Superlative from './components/Superlative.jsx';

document.addEventListener('DOMContentLoaded', () => {
  // load the superlative component on the superlative.html page
  ReactDOM.render(
    <Superlative />,
    document.getElementById('superlative')
  )
});
