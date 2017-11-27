import React from 'react';
import axios from 'axios';
import Nav from './Nav.jsx';
import SuperlativeLink from './SuperlativeLink.jsx';

export default class Superlatives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      superlatives: []
    };
  }

  getAllSuperlatives() {
    axios.get('/getAllSuperlatives')
      .then((response) => {
        this.setState({ superlatives: response.data });
      })
      .catch((error) => {
        console.log(`----- getAllEvents error : ${error} -----`);
      });
  }

  componentDidMount() {
    this.getAllSuperlatives();
  }

  render() {
    return (
      <div>
        <Nav />

        <div className="container column">

          <h1>Superlatives</h1>
          <a className='addPage' href='/addSuperlative'>Add A Superlative</a>

          <div className="container row">
            {this.state.superlatives.map((superlative, index) => {
              return (
                <SuperlativeLink superlative={superlative} key={superlative._id} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

