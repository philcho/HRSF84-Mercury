import React from 'react';
import Nav from './Nav.jsx';
import Superlative from './Superlative.jsx'

export default class Superlatives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav />

        <div className="students list container column">
          <h1>Superlative</h1>

          {/* hardcoding superlatives with student data/info for now */}

          <div className="container row">
            <Superlative />
            <Superlative />
            <Superlative />
          </div>

          <div className="container row">
            <Superlative />
            <Superlative />
            <Superlative />
          </div>

          <div className="container row">
            <Superlative />
            <Superlative />
            <Superlative />
          </div>
        </div>
      </div>

    );
  }
}
