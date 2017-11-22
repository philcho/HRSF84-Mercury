import React from 'react';
import Nav from './Nav.jsx';
import CommentForm from './CommentForm.jsx';

export default class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="shoutouts container column">
        <Nav/>

        <h1>SHOUTOUTS</h1>

        <CommentForm/>

        {/* hardcoding shoutouts for now */}

        <div className="container row">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="container row">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="container row">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
