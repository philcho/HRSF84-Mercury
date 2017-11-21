import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile.jsx';

document.addEventListener('DOMContentLoaded', () => {
  // load the profile component on the profile.html page
  ReactDOM.render(
    <Profile/>,
    document.getElementById('profile')
  )
});
