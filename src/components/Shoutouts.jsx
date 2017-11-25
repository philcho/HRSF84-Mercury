import React from 'react';
import axios from 'axios';
import Nav from './Nav.jsx';
import CommentForm from './CommentForm.jsx';
import Shoutout from './Shoutout.jsx';

export default class Shoutouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoutouts: []
    };
  }

  componentDidMount() {
    this.getAllShoutouts();
  }

  getAllShoutouts() {
    axios.get('/getAllShoutouts')
      .then((response) => {
        this.setState({ shoutouts: response.data });
      })
      .catch((error) => {
        console.log(`----- getAllEvents error : ${error} -----`);
      });
  }

  render() {
    return (
      <div className="shoutouts container column">
        <Nav/>
        <h1>SHOUTOUTS</h1>
        <CommentForm/>

        <div className="container row">
          {this.state.shoutouts.map((shoutout, index) => {
            return (
              <Shoutout shoutout={shoutout} key={shoutout._id}/>
            );
          })}
        </div>
      </div>
    );
  }
}
