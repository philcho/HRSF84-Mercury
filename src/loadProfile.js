import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './profile';

document.addEventListener('DOMContentLoaded', function () {
  // load the profile component on the profile.html page
  ReactDOM.render(
    React.createElement(Profile),
    document.getElementById('profile')
  )
});
