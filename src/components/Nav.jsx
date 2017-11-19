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
          <a href="###">Link1</a>
          <a href="###">Link2</a>
          <a href="###">Link3</a>
        </div>
      </div>
    );
  }
}
