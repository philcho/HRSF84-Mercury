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
        <div>URBAE</div>
        <div>Class of 84</div>
      </div>
    );
  }
}
