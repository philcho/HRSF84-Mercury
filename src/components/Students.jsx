import React from 'react';
import Nav from './Nav.jsx';
import Student from './Student.jsx'

export default class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav/>

        <div className="students list container column">
          <h1>STUDENTS</h1>

          {/* hardcoding students for now */}

          <div className="container row">
            <Student/>
            <Student/>
            <Student/>
          </div>

          <div className="container row">
            <Student/>
            <Student/>
            <Student/>
          </div>

          <div className="container row">
            <Student/>
            <Student/>
            <Student/>
          </div>
        </div>
      </div>

    );
  }
}
