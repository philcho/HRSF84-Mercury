import React from 'react';
import ReactDOM from 'react-dom';
import AddSuperlative from './components/AddSuperlative.jsx';

document.addEventListener('DOMContentLoaded', () => {
  // load the superlative component on the superlative.html page
  ReactDOM.render(
    <AddSuperlative />,
    document.getElementById('addSuperlative')
  );
});
