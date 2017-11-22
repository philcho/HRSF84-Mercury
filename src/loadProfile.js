import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Profile/>,
    document.getElementById('profile')
  )
});
