import React from 'react';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="nav container row">
        <div id="logo">🌚 Mercury</div>

        <div id="menu">
          <a href="/students">Students</a>
          <a href="/events">Events</a>
          <a href="/superlatives">Superlatives</a>
          <a href="/shoutouts">Shoutouts</a>
        </div>
      </div>
    );
  }
}
