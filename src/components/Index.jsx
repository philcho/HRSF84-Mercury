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
        <div className="title-collective title-page">COLLECTIVE</div>
        <div className="subtitle-collective subtitle-page">Your community awaits you.</div>

        <div className="box">
          <img className="avatar loaded" src="//cdn.shopify.com/s/files/1/1347/6161/files/zach_200x200.jpg?v=1496964588" />
        </div>
      </div>
    );
  }
}
