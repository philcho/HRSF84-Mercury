import React from 'react';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="nav">
        <img id="logo" src=""/>

        <div id="menu"></div>
      </div>
    );
  }
}
