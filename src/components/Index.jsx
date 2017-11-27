import React from 'react';
import Nav from './Nav.jsx';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="index container column">
        <Nav/>

        <div className="hero">
          <div className="title-collective title-page">COLLECTIVE</div>
          <div className="subtitle-collective subtitle-page">Your space. Your memories. Your community.</div>
        </div>

        <div class="stripes">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
}

